import './page/index.css';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import ModalProfile from './scripts/ModalProfile.js';
import Api from './scripts/Api.js';

import logoSrc from './images/logo.png';
import profileImageSrc from './images/profile__image.jpg';
import addIconSrc from './images/add.svg';
import editIconSrc from './images/edit.svg';

// Instância da API
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
    headers: {
        authorization: "c27e8b71-839c-45ed-b81c-981deeb16426",
        "Content-Type": "application/json"
    }
});

let userId; // Variável para armazenar o ID do usuário
const modalProfile = '#modalProfile';
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
const profileEditimage = document.querySelector(".profile__image-container");
const popupProfileSelector = '#popup-profile';
const popupProfileImage = '#popup__profile-image';
const popupCardSelector = '#popup-card';
const cardsContainerSelector = '.card__container';

const profileImage = document.querySelector('.profile__image');
profileImage.src = profileImageSrc;

const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logoSrc;

const profileEdit = document.querySelector('.profile__edit');
profileEdit.style.backgroundImage = `url(${editIconSrc})`;

const profileAdd = document.querySelector('.profile__add');
profileAdd.style.backgroundImage = `url(${addIconSrc})`;

function handleLikeClick(cardId, isLiked, card) {
    console.log(`Curtindo ou removendo curtida para o cartão: ${cardId}. Curtido: ${isLiked}`);
    
    let apiCall;

    if (isLiked) {
        apiCall = api.unlikeCard(cardId);  
    } else {
        apiCall = api.likeCard(cardId);    
    }

    apiCall
        .then((data) => {
            console.log(`Atualização de curtidas recebida para o cartão: ${cardId}`);
            card.setLikes(data.likes);  
        })
        .catch((err) => {
            console.error('Erro ao atualizar curtida:', err);
        })
        .finally(() => {
            card._likeButton.classList.remove('cards__card_loading');
        });
}

function createCard(data) {
    const card = new Card(
        {
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,  
            ownerId: data.owner._id
        },
        '#template-card',
      ({name, link}) => handleCardClick({name,link}),
       (cardId, isLiked, card) => handleLikeClick(cardId, isLiked, card) 
    );
    return card.generateCard();
}

const cardList = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, cardsContainerSelector);

api.getInitialCards()
    .then((cards) => {
        if (Array.isArray(cards)) {
            cardList.renderItems(cards);
        } else {
            console.error("Erro: O retorno da API não é um array", cards);
        }
    })
    .catch((err) => {
        console.log("Erro ao carregar os cartões:", err);
    });

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__about'
});

api.getUserInfo()
    .then((result) => {
        userId = result._id;  
        userInfo.setUserInfo({
            name: result.name,
            job: result.about
        });
        document.querySelector('.profile__image').src = result.avatar;
    })
    .catch((err) => {
        console.log("Erro ao carregar as informações do usuário:", err);
    });

function handleCardClick({ name, link }) {
    imagePopup.open({ name, link });
}

const imagePopup = new PopupWithImage('.modalImage');
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
    popupSelector: popupProfileSelector,  
    handleFormSubmit: (formData) => {
        api.updateUserInfo({
            name: formData['popup-profile-name'],
            about: formData['popup-profile-about']
        }).then((updatedUserInfo) => {
            userInfo.setUserInfo(updatedUserInfo);
        }).catch(err => {
            console.log("Erro ao atualizar as informações do usuário:", err);
        });
    }
});

editProfilePopup.setEventListeners();




const addCardPopup = new PopupWithForm({
    popupSelector: popupCardSelector,
    handleFormSubmit: (formData) => {
        api.addCard({
            name: formData['popup-card-name'],
            link: formData['popup-card-link']
        }).then((newCard) => {
            const cardElement = createCard(newCard);
            cardList.addItem(cardElement);
        }).catch(err => {
            console.log("Erro ao adicionar um novo cartão:", err);
        });
    }
});

addCardPopup.setEventListeners();


profileEditButton.addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    document.querySelector('#popup-profile-name').value = userInfoData.name;
    document.querySelector('#popup-profile-about').value = userInfoData.job;
    editProfilePopup.open();
});

profileEditimage.addEventListener('click', () => {
    ModalProfile.open();
});
profileAddButton.addEventListener('click', () => {
    addCardPopup.open();
});


const closeModal = document.querySelector('.modalImage__close');
closeModal.addEventListener('click', () => {
    imagePopup.close();  
});

const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__edit-text",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-disable",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__error_visible"
};

document.querySelectorAll(validationSettings.formSelector).forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});

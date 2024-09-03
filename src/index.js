import './page/index.css';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import  PopupWithImage  from './scripts/PopupWithImage.js';
import  PopupWithForm  from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import Api from './scripts/Api.js'; 

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
    headers: {
        authorization: "c27e8b71-839c-45ed-b81c-981deeb16426",
        "Content-Type": "application/json"
    }
});

api.getInitialCards().then((cards) => {
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardList.addItem(cardElement);
    });
}).catch(err => {
    console.log("Erro ao carregar os cartões:", err);
});


const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");

const popupProfileSelector = '#popup-profile';
const popupCardSelector = '#popup-card';
const cardsContainerSelector = '.card__container';
import logoSrc from './images/logo.png';
import profileImageSrc from './images/profile__image.jpg';
import addIconSrc from './images/add.svg';
import editIconSrc from './images/edit.svg';

const profileImage = document.querySelector('.profile__image');
profileImage.src = profileImageSrc;

const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logoSrc;

const profileEdit = document.querySelector('.profile__edit');
profileEdit.style.backgroundImage = `url(${editIconSrc})`;

const profileAdd = document.querySelector('.profile__add');
profileAdd.style.backgroundImage = `url(${addIconSrc})`;

// Continue with other initializations and event listeners as required


// Configurações do validador de formulário
const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__edit-text",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-disable",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__error_visible"
};

// Função para criação de cards
function createCard(data) {
    const card = new Card(data, '#template-card', handleCardClick);
    return card.generateCard();
}

// Instância da classe Section
const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, cardsContainerSelector);

// Renderiza os cards iniciais
cardList.renderItems();

// Instância da classe UserInfo
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__about'
});

api.getUserInfo().then((result) => {
    userInfo.setUserInfo({
        name: result.name,
        job: result.about
    });
    document.querySelector('.profile__image').src = result.avatar;
}).catch(err => {
    console.log("Erro ao carregar as informações do usuário:", err);
});

// Função de callback para o clique no card
function handleCardClick({ name, link }) {
    imagePopup.open({ name, link });
}
 
// Instância da classe PopupWithImage
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

// Adiciona ouvintes de eventos aos botões
profileEditButton.addEventListener('click', () => {
   
    const userInfoData = userInfo.getUserInfo();
    document.querySelector('#popup-profile-name').value = userInfoData.name;
    document.querySelector('#popup-profile-about').value = userInfoData.job;
    editProfilePopup.open();
});

profileAddButton.addEventListener('click', () => {
    
    addCardPopup.open();
});

const closeModal = document.querySelector('.modalImage__close');

closeModal.addEventListener('click', () => {
    console.log('Botão de fechar clicado para fechar a imagem modal');
   
    imagePopup.close();  // Fechar o modal de imagem
});
// Instancia os validadores de formulário
document.querySelectorAll(validationSettings.formSelector).forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});


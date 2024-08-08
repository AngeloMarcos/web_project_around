import './page/index.css';
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import  PopupWithForm  from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

import './page/index.css';
console.log('Webpack is working!');

// Dados iniciais
const initialCards = [
    {
        name: "Vale de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
        name: "Montanhas Carecas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
        name: "Parque Nacional da Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

// Seletores de DOM
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
const popupProfileSelector = '#popup-profile';
const popupCardSelector = '#popup-card';
const cardsContainerSelector = '.card__container';
const cardsContainer = document.querySelector(cardsContainerSelector);

import './page/index.css';
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
    items: initialCards,
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

// Função de callback para o clique no card
function handleCardClick({ name, link }) {
    console.log('handleCardClick chamado com:', name, link);
    imagePopup.open({ name, link });
}

// Instância da classe PopupWithImage
const imagePopup = new PopupWithImage('.modalImage');
imagePopup.setEventListeners();

// Instância da classe PopupWithForm para edição do perfil
const editProfilePopup = new PopupWithForm({
    popupSelector: popupProfileSelector,
    handleFormSubmit: (formData) => {
        console.log('editProfilePopup handleFormSubmit chamado com:', formData);
        userInfo.setUserInfo({
            name: formData['popup-profile-name'],
            job: formData['popup-profile-about']
        });
    }
});
editProfilePopup.setEventListeners();

// Instância da classe PopupWithForm para adição de novo card
const addCardPopup = new PopupWithForm({
    popupSelector: popupCardSelector,
    handleFormSubmit: (formData) => {
       
        const newCard = createCard({
            name: formData['popup-card-name'],
            link: formData['popup-card-link']
        });
        cardList.addItem(newCard);
    }
});
addCardPopup.setEventListeners();

// Adiciona ouvintes de eventos aos botões
profileEditButton.addEventListener('click', () => {
    console.log('profileEditButton clicado');
    const userInfoData = userInfo.getUserInfo();
    document.querySelector('#popup-profile-name').value = userInfoData.name;
    document.querySelector('#popup-profile-about').value = userInfoData.job;
    editProfilePopup.open();
});

profileAddButton.addEventListener('click', () => {
    console.log('profileAddButton clicado');
    addCardPopup.open();
});

// Instancia os validadores de formulário
document.querySelectorAll(validationSettings.formSelector).forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement);
    formValidator.enableValidation();
});

// Adiciona evento para gerenciamento de ações nos cards
cardsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("cards__card_heart")) {
        evt.target.classList.toggle("cards__card_active");
    }
    if (evt.target.classList.contains("cards__card_bin")) {
        evt.target.closest(".cards__card").remove();
    }
    if (evt.target.classList.contains("cards__card_image")) {
        const url = evt.target.src;
        const caption = evt.target.alt;
        document.querySelector(".modalImage__content").src = url;
        document.querySelector(".modalImage__content").alt = caption;
        document.querySelector(".modalImage__caption").textContent = caption;
        imagePopup.open();
    }
});

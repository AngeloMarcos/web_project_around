import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, openModal, closeModal } from './Utils.js';

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

const profile = document.querySelector(".profile__edit");
const card = document.querySelector(".profile__add");
const closeButtons = document.querySelectorAll(".popup__close");
const modalCloseButtons = document.querySelectorAll(".modalImage__close");
const popupProfile = document.getElementById("popup-profile");
const popupCard = document.getElementById("popup-card");
const cardsContainer = document.querySelector(".card__container");

initialCards.forEach((cardData) => {
    const card = new Card(cardData, "#template-card");
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
});

function editForm(evt) {
    if (evt.target.classList.contains("profile__edit")) {
        openPopup(popupProfile);
    }
    if (evt.target.classList.contains("profile__add")) {
        openPopup(popupCard);
    }
}

profile.addEventListener("click", editForm);
card.addEventListener("click", editForm);

closeButtons.forEach(button => button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
}));

modalCloseButtons.forEach(button => button.addEventListener("click", (evt) => {
    const modal = evt.target.closest(".modalImage");
    closeModal(modal);
}));

popupProfile.querySelector(".popup__form").addEventListener("submit", procesarPopup);
popupCard.querySelector(".popup__form").addEventListener("submit", procesarPopup);

function procesarPopup(e) {
    e.preventDefault();
    const popup = e.target.closest(".popup");
    if (popup === popupProfile) {
        document.querySelector(".profile__name").textContent = document.querySelector("#popup-profile-name").value;
        document.querySelector(".profile__about").textContent = document.querySelector("#popup-profile-about").value;
    }
    if (popup === popupCard) {
        addCard();
    }
    closePopup(popup);
}

function addCard() {
    const title = document.querySelector("#popup-card-name").value;
    const link = document.querySelector("#popup-card-link").value;
    const card = new Card({ name: title, link: link }, "#template-card");
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
}

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__edit-text",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-disable",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__error_visible"
};

document.querySelectorAll(settings.formSelector).forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
});

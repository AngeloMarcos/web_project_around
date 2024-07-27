import { openModal } from './Utils.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__card')
            .cloneNode(true);

        return cardElement;
    }

    _handleCardClick() {
        const modalImage = document.querySelector(".modalImage");
        modalImage.querySelector(".modalImage__content").src = this._link;
        modalImage.querySelector(".modalImage__content").alt = this._name;
        modalImage.querySelector(".modalImage__caption").textContent = this._name;
        openModal(modalImage);
    }

    _handleLikeButton() {
        this._element.querySelector('.cards__card_heart').classList.toggle('cards__card_active');
    }

    _handleDeleteButton() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__card_heart').addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._element.querySelector('.cards__card_bin').addEventListener('click', () => {
            this._handleDeleteButton();
        });

        this._element.querySelector('.cards__card_image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards__card_name').textContent = this._name;
        const cardImage = this._element.querySelector('.cards__card_image');
        cardImage.src = this._link;
        cardImage.alt = this._name;

        this._setEventListeners();

        return this._element;
    }
}

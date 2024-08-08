class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__card')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards__card_image').src = this._link;
        this._element.querySelector('.cards__card_image').alt = this._name;
        this._element.querySelector('.cards__card_name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__card_image').addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
        this._element.querySelector('.cards__card_heart').addEventListener('click', () => {
            this._element.querySelector('.cards__card_heart').classList.toggle('cards__card_active');
        });
        this._element.querySelector('.cards__card_bin').addEventListener('click', () => {
            this._element.remove();
        });
    }
}

export { Card };

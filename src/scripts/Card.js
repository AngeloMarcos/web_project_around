class Card {
    constructor(data, templateSelector, handleCardClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        console.log('constructor sendo chamado', handleLikeClick);
    }

    _getTemplate() {
        const templateElement = document.querySelector(this._templateSelector);
        return templateElement.content.cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__card_heart');
        this._likeCountElement = this._element.querySelector('.cards__card_like-count');

        this._setEventListeners();
        this._updateCardInfo();
        this._updateLikeState(); // Atualiza o estado do botão de curtida
        return this._element;
    }

    _setEventListeners() {
        const image = this._element.querySelector('.cards__card_image');
        image.addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));

        this._likeButton.addEventListener('click', () => {
            // Adiciona um indicador de carregamento ao botão de curtida
            this._likeButton.classList.add('cards__card_loading');

            const isLiked = this._isLiked;

            this._handleLikeClick(this._id, isLiked, this)
                
        });
    }

    _updateCardInfo() {
        const image = this._element.querySelector('.cards__card_image');
        image.src = this._link;
        image.alt = this._name;

        const nameElement = this._element.querySelector('.cards__card_name');
        nameElement.textContent = this._name;

        // Atualiza o número de curtidas no DOM
        this._likeCountElement.textContent = this._likes.length;
    }

    _updateLikeState() {
        this._isLiked = this._likes.some((like) => like._id === this._userId);
        if (this._isLiked) {
            this._likeButton.classList.add('cards__card_active');
        } else {
            this._likeButton.classList.remove('cards__card_active');
        }
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        this._likeCountElement.textContent = this._likes.length;
        this._updateLikeState(); // Atualiza o estado do botão de curtida
    }
}

export { Card };

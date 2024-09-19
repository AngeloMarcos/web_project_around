class Card {
    constructor(data, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _getTemplate() {
        const templateElement = document.querySelector(this._templateSelector);
        return templateElement.content.cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__card_heart');
        this._likeCountElement = this._element.querySelector('.cards__card_like-count');
        this._deleteButton = this._element.querySelector('.cards__card_bin');
    
        // Verifica se o cartão pertence ao usuário logado
        if (this._ownerId !== this._userId) {
            this._deleteButton.remove(); // Remove o botão de lixeira se não for o dono do cartão
        }
    
        this._setEventListeners();
        this._updateCardInfo();
        this._updateLikeState(); // Atualiza o estado do botão de curtida
    
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(); // Função para curtir o cartão
        });
    
        // Verifica se o botão de exclusão existe antes de adicionar o evento
        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', () => {
                // Abrir popup de confirmação de exclusão
                deletePopup.open();
    
                // Listener para a confirmação da exclusão no popup
                deletePopup.setSubmitAction(() => {
                    // Chama a API para excluir o cartão
                    api.deleteCard(this._id)
                        .then(() => {
                            // Remove o cartão do DOM após a exclusão
                            this._element.remove();
                            deletePopup.close(); // Fecha o popup após a exclusão
                        })
                        .catch((err) => {
                            console.error('Erro ao excluir o cartão:', err);
                        });
                });
            });
        }
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
        this._updateLikeState(); 
    }
}

export { Card };

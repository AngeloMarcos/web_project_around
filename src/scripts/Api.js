export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Método para verificar a resposta do servidor
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Erro: ${res.status}`);
    }

    // Método para tratar erros de requisição
    _handleError(error) {
        console.error(error);
    }

    // Método para obter as informações do usuário
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para obter os cartões iniciais
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para atualizar as informações do perfil do usuário
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para adicionar um novo cartão
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para curtir um cartão
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para remover a curtida de um cartão
    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para deletar um cartão
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }

    // Método para atualizar a foto do perfil
    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse)
        .catch(this._handleError);
    }
}

// Instanciar a classe API com as configurações necessárias
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
    headers: {
        authorization: "c27e8b71-839c-45ed-b81c-981deeb16426",
        "Content-Type": "application/json"
    }
});

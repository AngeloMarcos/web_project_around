import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        console.log(this._popup); // Verifica se o popup foi corretamente selecionado
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        if (!this._form) {
            console.error("Formulário não encontrado no popup.");
        }
        this._confirmButton = this._popup.querySelector('.popup__button-save');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__edit-text'));
    }

    // Adiciona os event listeners necessários
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close(); // Fecha o popup após o envio do formulário
        });
    }

    // Obter os valores do formulário
    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    close() {
        super.close();
        this._form.reset(); // Reseta o formulário após fechar
    }
}

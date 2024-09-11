// ModalProfile.js
import Popup from './Popup.js';

export default class ModalProfile extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeButton = this._popup.querySelector('.modalProfile__close');
        this._fileInput = this._popup.querySelector('.modalProfile__input');
        this._submitButton = this._popup.querySelector('.modalProfile__submit-button');
        
        this.setEventListeners(); // Use setEventListeners da classe base
    }

    _setEventListeners() {
        super.setEventListeners();
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._fileInput.files[0]);
        });
    }

  

    open() {
        this._popup.classList.add('modalImage_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('modalImage_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }


    _handleFormSubmit(file) {
        console.log('Arquivo selecionado:', file);
        this.close(); // Fecha o modal após o envio
    }
}

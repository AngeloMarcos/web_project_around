import  Popup  from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit}) {
        
        super(popupSelector);
        console.log(this._popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        console.log("Valor do form", this._form);
        this._confirmButton = this._popup.querySelector('.popup__button-save');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__edit-text'));
        console.log("retorna", this._form);

    }
   
    

}


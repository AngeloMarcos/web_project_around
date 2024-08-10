import  Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open({ link, name }) {
        console.log('Abrindo imagem popup:', link, name);
        const image = this._popup.querySelector('.modalImage__content');
        const caption = this._popup.querySelector('.modalImage__caption');
        image.src = link;
        image.alt = name;
        caption.textContent = name;
        super.open();
    }
}
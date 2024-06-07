let editPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let editNameInput = document.querySelector('.popup__edit_name');
let editAboutInput = document.querySelector('.popup__edit_about');
let closePopupButton = document.querySelector('.popup__btn_close');
let likeButtons = document.querySelectorAll('.gallery__card_like');
let saveButton = document.querySelector('.popup__btn_save');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

editNameInput.value = "Jacques Cousteau";
editAboutInput.value = "Explorar";

editPopupButton.addEventListener("click", function () {
    popup.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
});

likeButtons.forEach(likeButton => {
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("gallery__card_like_active");
    });
});

saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    profileName.textContent = editNameInput.value;
    profileAbout.textContent = editAboutInput.value;
    popup.classList.remove("popup_opened");
});

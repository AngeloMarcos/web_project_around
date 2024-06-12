const editPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const editNameInput = document.querySelector('.popup__name');
const editAboutInput = document.querySelector('.popup__about');
const closePopupButton = document.querySelector('.popup__button-close');
const likeButtons = document.querySelectorAll('.card__like');
const saveButton = document.querySelector('.popup__button-save');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const form = document.querySelector('.popup__container');

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
        likeButton.classList.toggle("card__like_active");
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    profileName.textContent = editNameInput.value;
    profileAbout.textContent = editAboutInput.value;
    popup.classList.remove("popup_opened");
});

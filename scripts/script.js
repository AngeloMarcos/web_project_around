const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

const profile = document.querySelector(".profile__edit");
const card = document.querySelector(".profile__add");
const closeButtons = document.querySelectorAll(".popup__close");
const modalCloseButtons = document.querySelectorAll(".modalImage__close");
const popupProfile = document.getElementById("popup-profile");
const popupCard = document.getElementById("popup-card");
const cardsContainer = document.querySelector(".card__container");
const modalImage = document.querySelector(".modalImage");

function createCard(card) {
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate.querySelector(".cards__card").cloneNode(true);
  const cardName = cardElement.querySelector(".cards__card_name");
  cardName.textContent = card.name;
  const cardImage = cardElement.querySelector(".cards__card_image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  console.log(cardImage, card);
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

function editForm(evt) {
  if (evt.target.classList.contains("profile__edit")) {
    openPopup(popupProfile);
  }
  if (evt.target.classList.contains("profile__add")) {
    openPopup(popupCard);
  }
}

function openPopup(popup) {
  popup.style.display = "flex";
  setTimeout(function () {
    popup.classList.add("popup_opened");
  }, 100);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

function openModal() {
  modalImage.style.display = "block";
}
function closeModal() {
  modalImage.style.display = "none";
}

// Função para fechar o popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Adiciona event listeners para interações com os popups
document.querySelectorAll('.popup').forEach(popup => {
  // Fechar popup ao clicar fora do conteúdo
  popup.addEventListener('click', function (evt) {
    const elemento = evt.target;
    if (
      !elemento.classList.contains("popup__container") &&
      !elemento.classList.contains("popup__title") &&
      !elemento.classList.contains("popup__edit-text")
    ) {
      closePopup(popup);
    }
  });
});

// Fechar popup ao pressionar a tecla Escape
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup_opened').forEach(popup => {
      closePopup(popup);
    });
    if (document.querySelector('.modalImage_opened')) {
      closeModal();
    }
  }
});
function procesarPopup(e) {
  e.preventDefault();
  const popup = e.target.closest(".popup");
  if (popup === popupProfile) {
    document.querySelector(".profile__name").textContent = document.querySelector("#popup-profile-name").value;
    document.querySelector(".profile__about").textContent = document.querySelector("#popup-profile-about").value;
  }
  if (popup === popupCard) {
    addCard();
  }
  closePopup(popup);
}

profile.addEventListener("click", editForm);
card.addEventListener("click", editForm);

closeButtons.forEach(button => button.addEventListener("click", (evt) => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}));

modalCloseButtons.forEach(button => button.addEventListener("click", (evt) => {
  const modal = evt.target.closest(".modalImage");
  closeModal(modal);
}));

popupProfile.querySelector(".popup__form").addEventListener("submit", procesarPopup);
popupCard.querySelector(".popup__form").addEventListener("submit", procesarPopup);

function addCard() {
  const title = document.querySelector("#popup-card-name").value;
  const link = document.querySelector("#popup-card-link").value;
  const cardElement = createCard({ name: title, link: link });
  cardsContainer.prepend(cardElement);
}
function closeModal() {
  const modal = document.querySelector(".modalImage");
  modal.classList.remove("modalImage_opened");
  modal.style.display = "none";
}

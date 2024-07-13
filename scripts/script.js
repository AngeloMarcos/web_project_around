// Lista inicial de cards, cada card contém um nome e um link para uma imagem
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

// Seleciona elementos do DOM que serão utilizados
const profile = document.querySelector(".profile__edit");
const card = document.querySelector(".profile__add");
const closeButtons = document.querySelectorAll(".popup__close");
const popupProfile = document.getElementById("popup-profile");
const popupCard = document.getElementById("popup-card");
const cardsContainer = document.querySelector(".card__container");
const modalImage = document.querySelector(".modalImage");

// Função para criar um novo card a partir do template e preencher com dados
function createCard(card) {
 
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".cards__card_name");
  cardName.textContent = card.name;
  const cardImage = cardElement.querySelector(".cards__card_image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  console.log(cardImage, card);
  return cardElement;
  
}

// Adiciona cada card inicial ao container de cards
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// Função para abrir o popup e definir o conteúdo dependendo do botão clicado
function editForm(evt) {
  if (evt.target.classList.contains("profile__edit")) {
    openPopup(popupProfile);
  }
  if (evt.target.classList.contains("profile__add")) {
    openPopup(popupCard);
  }
}

// Abre o popup
function openPopup(popup) {
  popup.style.display = "flex";
  setTimeout(function () {
    popup.classList.add("popup_opened");
  }, 100);
}

// Fecha o popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

// Abre o modal de imagem
function openModal() {
  modalImage.style.display = "block";
}

// Fecha o modal de imagem
function closeModal() {
  modalImage.classList.remove("modalImage_opened");
  modalImage.style.display = "none";
}

// Processa o formulário do popup (salva perfil ou adiciona card)
function procesarPopup(e) {
  e.preventDefault();
  const popup = e.target.closest(".popup");
  if (popup === popupProfile) {
    document.querySelector(".profile__name").textContent =
      document.querySelector("#popup-profile-name").value;
    document.querySelector(".profile__about").textContent =
      document.querySelector("#popup-profile-about").value;
  }
  if (popup === popupCard) {
    addCard();
  }
  closePopup(popup);
}

// Adiciona event listeners para os botões
profile.addEventListener("click", editForm);
card.addEventListener("click", editForm);
closeButtons.forEach(button => button.addEventListener("click", (evt) => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}));

// Adiciona event listeners para os formulários dos popups
popupProfile.querySelector(".popup__form").addEventListener("submit", procesarPopup);
popupCard.querySelector(".popup__form").addEventListener("submit", procesarPopup);

// Função para adicionar um novo card
function addCard() {
  const title = document.querySelector("#popup-card-name").value;
  const link = document.querySelector("#popup-card-link").value;
  const cardElement = createCard({ name: title, link: link });
  cardsContainer.prepend(cardElement);
}



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
const close = document.querySelector(".popup__close");
const imageClose = document.querySelector(".modalImage__close");
const popup = document.querySelector(".popup");
const button = document.querySelector(".popup__button-save");
const cardsContainer = document.querySelector(".cards__container");
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
  return cardElement;
}

// Adiciona cada card inicial ao container de cards
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// Função para abrir o popup e definir o conteúdo dependendo do botão clicado
function editForm(evt) {
  openPopup();
  if (evt.target.classList.contains("profile__edit")) {
    popupProfile();
  }
  if (evt.target.classList.contains("profile__add")) {
    popupCards();
  }
}

// Configura o popup para editar perfil
function popupProfile() {
  document.querySelector(".popup__title").textContent = "Editar perfil";
  document.querySelector(".popup__button-save").textContent = "Salvar";
  const inputName = document.querySelector(".popup__name");
  inputName.value = document.querySelector(".profile__name").textContent;
  const inputAbout = document.querySelector(".popup__about");
  inputAbout.value = document.querySelector(".profile__about").textContent;
}

// Configura o popup para adicionar um novo card
function popupCards() {
  document.querySelector(".popup__title").textContent = "Novo Local";
  document.querySelector(".popup__button-save").textContent = "Criar";
  const inputName = document.querySelector(".popup__name");
  inputName.value = "";
  inputName.setAttribute("placeholder", "Título");
  const inputAbout = document.querySelector(".popup__about");
  inputAbout.value = "";
  inputAbout.setAttribute("placeholder", "Link da Imagem");
}

// Abre o popup
function openPopup() {
  popup.style.display = "flex";
  setTimeout(function () {
    popup.classList.add("popup_opened");
  }, 100);
}

// Fecha o popup
function closePopup() {
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
  const tipoTitulo = document.querySelector(".popup__title");
  if (tipoTitulo.textContent === "Editar perfil") {
    document.querySelector(".profile__name").textContent =
      document.querySelector(".popup__name").value;
    document.querySelector(".profile__about").textContent =
      document.querySelector(".popup__about").value;
  }
  if (tipoTitulo.textContent === "Novo Lugar") {
    addCard();
  }
  closePopup();
}

// Adiciona event listeners para os botões
profile.addEventListener("click", editForm);
card.addEventListener("click", editForm);
close.addEventListener("click", closePopup);
imageClose.addEventListener("click", closeModal);
button.addEventListener("click", procesarPopup);

// Função para adicionar um novo card
function addCard() {
  const title = document.querySelector(".popup__name").value;
  const link = document.querySelector(".popup__about").value;
  const cardTemplate = document.querySelector("#template-card").content;
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  cardElement.querySelector(".cards__card_name").textContent = title;
  cardElement.querySelector(".cards__card_image").src = link;
  cardElement.querySelector(".cards__card_image").alt = title;
  cardsContainer.prepend(cardElement);
}

// Adiciona event listeners para interações com os cards
cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("cards__card_heart")) {
    evt.target.classList.toggle("cards__card_active");
  }
  if (evt.target.classList.contains("cards__card_bin")) {
    evt.target.closest(".cards__card").remove();
  }
  if (evt.target.classList.contains("cards__card_image")) {
    const url = evt.target.src;
    const caption = evt.target.alt;
    document.querySelector(".modalImage__content").src = url;
    document.querySelector(".modalImage__content").alt = caption;
    document.querySelector(".modalImage__caption").textContent = caption;
    openModal();
  }
});

// Evita que o popup feche ao clicar nos inputs
const inputs = document.querySelectorAll(".popup__edit-text");
inputs.forEach((input) => {
  input.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

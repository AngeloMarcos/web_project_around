const formElement = document.querySelector(".popup__container");
const formInput = formElement.querySelector(".popup__input-text");

popup.addEventListener("click", function (evt) {
  const elemento = evt.target;
  if (
    !elemento.classList.contains("popup__container") &&
    !elemento.classList.contains("popup__title") &&
    !elemento.classList.contains("popup__input-text")
  ) {
    closePopup();
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key == "Escape") {
    closePopup();
  }
});



// Função para verificar se há inputs inválidos
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Função para alternar o estado do botão de salvar
const toggleButtonState = (inputList, buttonElement) => {
  const isValidLength = inputList.every(inputElement => inputElement.value.length >= 2);

  if (hasInvalidInput(inputList) || !isValidLength) {
    buttonElement.classList.add("popup__button-disable");
    buttonElement.disabled = true; // Desabilita o botão para evitar cliques
  } else {
    buttonElement.classList.remove("popup__button-disable");
    buttonElement.disabled = false; // Ativa o botão
  }
};

// Configura os event listeners para os inputs do formulário
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__edit-text"));
  const buttonElement = formElement.querySelector(".popup__button-save");

  // Adiciona a classe de desabilitado ao botão inicialmente
  buttonElement.classList.add("popup__button-disable");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement);
    });
  });
};

setEventListeners(formElement);
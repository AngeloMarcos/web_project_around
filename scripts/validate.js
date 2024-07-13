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
    document.querySelectorAll('.popup').forEach(popup => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
});

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

// Função para exibir erro de input
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

// Função para ocultar erro de input
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

// Função para obter mensagem de erro baseada na validade do input
function getErrorMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    return "Preencha esse campo.";
  }
  if (inputElement.validity.tooShort) {
    return "Preencha esse campo.";
  }
  if (inputElement.validity.typeMismatch && inputElement.type === "url") {
    return "Por favor, insira um endereço web.";
  }
 
}

// Função para verificar a validade do input
function checkInputValidity(settings, inputElement, formElement) {
  if (!inputElement.validity.valid) {
    const errorMessage = getErrorMessage(inputElement);
    showInputError(formElement, inputElement, errorMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

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
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button-disable");
    buttonElement.disabled = false;
  }
};

// Configura os event listeners para os inputs do formulário
const setEventListeners = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);

  forms.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(settings, inputElement, form);
        toggleButtonState(inputList, buttonElement);
      });
    });
    
    toggleButtonState(inputList, buttonElement);
  });
};

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__edit-text",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-disable",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error_visible"
};

setEventListeners(settings);

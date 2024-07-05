
// Função para exibir erro de input
function showInputError(formElement, inputElement, errorMessage, settings) {
  // Seleciona o elemento de erro relacionado ao input
  
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorMessage);
  // Adiciona a classe de erro ao input
  inputElement.classList.add(settings.inputErrorClass);
  // Define a mensagem de erro no elemento de erro
  errorElement.textContent = errorMessage;
  // Adiciona a classe de erro visível ao elemento de erro
  errorElement.classList.add(settings.errorClass);
}
// Função para ocultar erro de input
function hideInputError(formElement, inputElement, settings) {
  // Seleciona o elemento de erro relacionado ao input
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Remove a classe de erro do input
  inputElement.classList.remove(settings.inputErrorClass);
  // Remove a classe de erro visível do elemento de erro
  errorElement.classList.remove(settings.errorClass);
  // Limpa a mensagem de erro no elemento de erro
  errorElement.textContent = "";
}


// Função para obter mensagem de erro baseada na validade do input
function getErrorMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    return "Preencha esse campo."; // Mensagem para campo vazio
  }
  if (inputElement.validity.tooShort) {
    return "Preencha esse campo."; // Mensagem para campo com texto muito curto
  }
  if (inputElement.validity.typeMismatch && inputElement.type === "url") {
    return "Por favor, insira um endereço web."; // Mensagem para URL inválida
  }
}

// Função para verificar a validade do input
function checkInputValidity(settings, inputElement, formElement ) {
  console.log(inputElement);
  if (!inputElement.validity.valid) {
    // Obtém a mensagem de erro
    
    const errorMessage = getErrorMessage(inputElement);
    // Exibe a mensagem de erro
    showInputError(formElement, inputElement, errorMessage, settings);
  } else {
    console.log("foi para o else");
    // Oculta a mensagem de erro se o input for válido
    hideInputError(formElement, inputElement, settings);
  }
}



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
  const isValidLength = inputList.every(inputElement => inputElement.value.length >= 2 );

  if (hasInvalidInput(inputList) || !isValidLength) {
    buttonElement.classList.add("popup__button-disable");
    
    buttonElement.disabled = true; // Desabilita o botão para evitar cliques
  } else {
    buttonElement.classList.remove("popup__button-disable");
    buttonElement.disabled = false; // Ativa o botão
  }
};

// Configura os event listeners para os inputs do formulário
const setEventListeners = (settings) => {
  const form = document.querySelector(settings.formSelector);
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  // Adiciona a classe de desabilitado ao botão inicialmente
  buttonElement.classList.add(settings.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(settings, inputElement, form);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const settings = {
  formSelector: ".popup__container",
  inputSelector: ".popup__edit-text",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-disable",
  inputErrorClass: "popup__error",
  errorClass: "popup__button-disable"
};

setEventListeners(settings);





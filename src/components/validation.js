export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button__inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

export function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

export function checkInputPattern(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
}

export function isValid(formElement, inputElement) {
  checkInputPattern(inputElement);
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

export function hasInvalideInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

export function toggleButtonState(inputs, button, validationConfig) {
  if (hasInvalideInput(inputs)) {
    button.setAttribute("disabled", "");
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.removeAttribute("disabled", "");
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function setInputValidation(formElement, validationConfig) {
  const formElementInputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  formElementInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(formElementInputs, buttonSubmit, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach(
    (form) => {
      setInputValidation(form, validationConfig);
    }
  );
}

export function clearValidation(formElement, validationConfig) {
  const inputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  buttonSubmit.setAttribute("disabled", "");
  buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
  inputs.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });
}

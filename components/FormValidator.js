class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this._inputElements = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    }
  
    _showInputError = (errorMessage, inputElement) => {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorElementId);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);

    };
    
    _hideInputError(inputElement) {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorElementId);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = "";
    };
    
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement.validationMessage, inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _hasInvalidInput() {
      return this._inputElements.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };


    _toggleButtonState () {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        this._submitButton.disabled = true;
      } else {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.disabled = false;
      }
    };
    
    _setEventListeners = () => {

      this._toggleButtonState();
    
      this._inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputElement);
        });
      });
    };
    
    enableValidation = () => {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        
      });
      this._setEventListeners();
    };

    resetValidation() {
      this._inputElements.forEach((input) => {
        this._hideInputError(input)
      });
  
      this._formElement.reset();
      this._toggleButtonState();
    }
  }
  
  export default FormValidator;
  
import { clearValidation, validationConfig } from "./validation";

export const page = document.querySelector(".page");
export const popups = Array.from(document.querySelectorAll(".popup"));

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  page.addEventListener("mousedown", closePopupForOverlay);
  page.addEventListener("keydown", closePopupForEscape);
}

export function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
  });
  page.removeEventListener("click", closePopupForOverlay);
  page.removeEventListener("keydown", closePopupForEscape);
}

export function closePopupForOverlay(evt) {
  if (popups.includes(evt.target)) {
    closePopup();
  }
}

export function closePopupForEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

export function clearPopup(form) {
  form.reset();
  clearValidation(form, validationConfig);
  closePopup();
}

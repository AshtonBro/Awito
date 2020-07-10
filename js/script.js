"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add"),
  btnAddAd = document.querySelector(".add__ad"),
  btnModalSubmin = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  btnModalWarning = document.querySelector(".modal__btn-warning");

const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" || elem.type !== "submit"
);

const closeModal = (event) => {
  const target = event.target;

  if (
    target.closeModal(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
  }
};

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
  modalSubmit.reset();
});

modalSubmit.addEventListener("input", () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  btnModalSubmin.disabled = !validForm;
  btnModalWarning.style.display = validForm ? "none" : "";
});

btnAddAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  btnModalSubmin.disabled = true;
  document.addEventListener("keydown", closeModal);
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

catalog.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
});

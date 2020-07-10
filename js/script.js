"use strict";
const dataBase = JSON.parse(localStorage.getItem("awito")) || [];
const modalAdd = document.querySelector(".modal__add"),
  btnAddAd = document.querySelector(".add__ad"),
  btnModalSubmin = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  btnModalWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input");

const infoPhoto = {};
const saveDB = () => localStorage.setItem("awito", JSON.stringify(dataBase));

const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" || elem.type !== "submit"
);

const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  btnModalSubmin.disabled = !validForm;
  btnModalWarning.style.display = validForm ? "none" : "";
};

const closeModal = (event) => {
  const target = event.target;
  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();
    checkForm();
  }
};

// * AddEventListeners method
modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
  saveDB();
  modalSubmit.reset();
});

btnAddAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  btnModalSubmin.disabled = true;
  document.addEventListener("keydown", closeModal);
});

catalog.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
});

modalFileInput.addEventListener("change", (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);
});

modalSubmit.addEventListener("input", checkForm);
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

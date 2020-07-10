"use strict";
const dataBase = JSON.parse(localStorage.getItem("awito")) || [];
const modalAdd = document.querySelector(".modal__add"),
  btnAddAd = document.querySelector(".add__ad"),
  btnModalSubmin = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  btnModalWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  btnModalFile = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add");

const textModalFile = btnModalFile.textContent;
const srcModalImage = modalImageAdd.src;

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
    modalImageAdd.src = srcModalImage;
    btnModalFile.textContent = textModalFile;
    checkForm();
  }
};

const renderCard = () => {
  catalog.textContent = "";
  dataBase.forEach((item, id) => {
    catalog.insertAdjacentHTML(
      "beforeend",
      `
    <li class="card" data-id="${id}">
      <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test" />
      <div class="card__description">
        <h3 class="card__header">${item.nameItem}</h3>
        <div class="card__price">${item.costItem} ₽</div>
      </div>
    </li>
  `
    );
  });
};

// * AddEventListeners method
modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  itemObj.image = infoPhoto.base64;
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
  saveDB();
  renderCard();
  //modalSubmit.reset();
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
  reader.addEventListener("load", (event) => {
    if (infoPhoto.size < 200000) {
      btnModalFile.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      btnModalFile.textContent = "Размер файла не больше 200кб";
      modalFileInput.valut = "";
      checkForm();
    }
  });
});

modalSubmit.addEventListener("input", checkForm);
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

renderCard();

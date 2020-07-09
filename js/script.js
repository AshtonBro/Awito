"use strict";

const modalAdd = document.querySelector(".modal__add"),
  btnAddAd = document.querySelector(".add__ad"),
  btnModalSubmin = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item");

const closeModal = function (event) {
  const target = event.target;

  if (target.closest(".modal__close") || target === this) {
    this.classList.add("hide");
    if (this === modalAdd) {
      modalSubmit.reset();
    }
  }
};

btnAddAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  btnModalSubmin.disabled = true;
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

catalog.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
  }
});

document.querySelector('keydown', event => {

})
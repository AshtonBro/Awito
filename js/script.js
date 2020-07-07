'use strict'

const modalAdd = document.querySelector('.modal__add'),
    btnAddAd = document.querySelector('.add__ad'),
    modalClose = document.querySelector('.modal__close'),
    header = document.querySelector('.header');

btnAddAd.addEventListener('click', () => {
    modalAdd.classList.toggle('hide');
});

modalAdd.addEventListener('click', (event) => {
    var target = event.target;
    if (target.matches('.modal__close') || target == modalAdd) {
        modalAdd.classList.toggle('hide');
    }
});
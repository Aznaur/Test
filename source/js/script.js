'use strict';

(function(){
  let navMain = document.querySelector('.main-nav');
  let navToggle = navMain.querySelector('.main-nav__toggle');
  let userLogin = navMain.querySelector('.user-list__login');
  let modal = document.querySelector('.modal');
  let foneField = document.querySelector('#registration-phone');
  let snilsField = document.querySelector('#registration-snils');

  var maskFnone = {
    mask: '+{7}(000)000-00-00'
  };

  var maskSnils = {
    mask: '000-000-000-00'
  };

  var mask = IMask(foneField, maskFnone);
  var mask = IMask(snilsField, maskSnils);

  var dateMask = IMask(
    document.querySelector('#registration-birth-date'),
    {
      mask: Date,
      min: new Date(1920, 0, 1),
      max: new Date(2020, 0, 1),
      lazy: false
    });

    navToggle.addEventListener('click', function() {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    });

    userLogin.addEventListener('click', function(evt) {
      evt.preventDefault();
      modal.classList.toggle('modal__open');
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    });
})();

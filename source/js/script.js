'use strict';

(function(){
  let navMain = document.querySelector('.main-nav');
  let navToggle = navMain.querySelector('.main-nav__toggle');
  let userLogin = navMain.querySelector('.user-list__login');
  let modal = document.querySelector('.modal');

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


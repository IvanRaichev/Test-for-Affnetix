export function isWebp() {
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {

      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });

}



export function popup() {
   const popupLinks = document.querySelectorAll('.popup-link');
   const popupButtons = document.querySelectorAll('.popup-button'); // Добавлены кнопки
   const body = document.querySelector('.body');
   const lockPadding = document.querySelectorAll(".lock-padding");

   let unlock = true;

   const timeout = 800;

   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);

            popupOpen(curentPopup);
            e.preventDefault();
         });
      }
   }

   // Обработчики для кнопок
   if (popupButtons.length > 0) {
      for (let index = 0; index < popupButtons.length; index++) {
         const popupButton = popupButtons[index];
         popupButton.addEventListener("click", function (e) {
            const popupName = popupButton.getAttribute('data-popup');
            const curentPopup = document.getElementById(popupName);

            popupOpen(curentPopup);
            e.preventDefault();
         });
      }
   }

   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         });
      }
   }

   function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
         const popupActive = document.querySelector('.popup.open');
         if (popupActive) {
            popupClose(popupActive, false);
         } else {
            bodyLock();
         }
         curentPopup.classList.add('open');
         curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
               popupClose(e.target.closest('.popup'));
            }
         });
      }
   }

   function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
         popupActive.classList.remove('open');
         if (doUnlock) {
            bodyUnLock();
         }
      }
   }

   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
         }
      }
      document.querySelector('body').style.paddingRight = lockPaddingValue;
      document.querySelector('body').classList.add('lock');

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnLock() {
      setTimeout(function () {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
         document.querySelector("body").style.paddingRight = "0px";
         document.querySelector("body").classList.remove("lock");
      }, 0);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);

   }

   document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   });
}



export function burgerMenu() {
   const menu = document.querySelector('.nav__burger-menu');
   const menuBtn = document.querySelector('.nav__burger');
   const body = document.body;

   if (menu && menuBtn) {

      menuBtn.addEventListener('click', () => {
         menu.classList.toggle('active');
         menuBtn.classList.toggle('active');
         body.classList.toggle('lock');
      })

      menu.addEventListener('click', e => {
         if (e.target.classList.contains('nav__burger-menu')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
         }
      })
   }
}



export function countDown() {
   const day = document.getElementById("day");
   const hrs = document.getElementById("hrs");
   const min = document.getElementById("min");
   const sec = document.getElementById("sec");

   const currentYear = new Date().getFullYear();

   const newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`)

   function countdownTimer() {
      const todayDate = Date.now();
      const gap = newYear - todayDate;

      const d = Math.floor(7);
      const h = Math.floor((gap / 1000 / 60 / 60) % 24);
      const m = Math.floor((gap / 1000 / 60) % 60);
      const s = Math.floor((gap / 1000) % 60);

      day.innerHTML = d < 10 ? "0" + d : d;
      hrs.innerHTML = h < 10 ? "0" + h : h;
      min.innerHTML = m < 10 ? "0" + m : m;
      sec.innerHTML = s < 10 ? "0" + s : s;
   }
   setInterval(countdownTimer, 1000);
}

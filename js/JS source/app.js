import * as flsFunction from "./modules/function.js";
import $ from "jquery";
import "slick-carousel";
flsFunction.isWebp();

$(".banners__slider").slick({
  infinite: true,
  fade: true,
  dots: true,
  arrows: false,
  autoplay: true,
});

flsFunction.countDown();
flsFunction.burgerMenu();
flsFunction.popup();

document.addEventListener("DOMContentLoaded", function () {
  let scrollButton = document.querySelector(".scroll-to-top");

  function scrollToTop() {
    let scrollToTopInterval = setInterval(function () {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        document.body.scrollTop -= 20;
        document.documentElement.scrollTop -= 20;
      } else {
        clearInterval(scrollToTopInterval);
      }
    }, 5);
  }

  function showScrollButton() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  }

  window.onscroll = showScrollButton;
  scrollButton.addEventListener("click", scrollToTop);
});

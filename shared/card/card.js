
import {createCartElement} from '/shared/cart/cart.js'

setTimeout( function() {
     cardRun();
  }, 1000);

  function cardRun() {
    const cardElements = document.querySelectorAll(".card");
    const arrayOfCards = Array.from(cardElements);
    arrayOfCards.forEach(cardElement => {
        cardElement.addEventListener("click", e => {
          //createCartElement();
          //console.log(e)
          window.localStorage.setItem('productId', e.currentTarget.id) //la click seteaza id ul nou
        });
    });
  }


import {createCartElement} from '/shared/cart/cart.js'

setTimeout( function() {
     cardRun();
  }, 1000);

  function cardRun() {
    const cardElements = document.querySelectorAll(".card");
    const arrayOfCards = Array.from(cardElements);
    arrayOfCards.forEach(cardElement => {
        cardElement.addEventListener("click", e => {
            createCartElement();
            window.localStorage.setItem('cart', JSON.stringify([{name: 'GreenApple', price: '19', count: 1}]));
        });
    });
  }

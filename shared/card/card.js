
setTimeout( function() {
     cardRun();
  }, 1000);

  function cardRun() {
    const cardElements = document.querySelectorAll(".card");
    const arrayOfCards = Array.from(cardElements);
    arrayOfCards.forEach(cardElement => {
        cardElement.addEventListener("click", e => {
          //la click seteaza id ul nou
          window.localStorage.setItem('productId', e.currentTarget.id) 
        });
    });
  }

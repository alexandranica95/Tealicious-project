AddCardComponent();

function AddCardComponent() {
  import('../shared/card/card.js')

  fetch("../shared/card/card.html")
    .then(response => {
      return response.text();
    })
    .then(data => {

        for (let i = 0; i < 8; i++){
        document.querySelector(".fruit-tea-products").innerHTML += data;
      }

      for (let i = 0; i < 6; i++){
        document.querySelector(".milk-tea-products").innerHTML += data;
      }

      for (let i = 0; i < 10; i++){
        document.querySelector(".cheesecake-products").innerHTML += data;
      }
      
    });
}

 await AddCarouselComponent();
 AddCategoryComponent();
 await AddFooterComponent();
 await AddCartComponent();

async function AddCarouselComponent() {
  import('./carousel/carousel.js')

  const response = await fetch("./carousel/carousel.html")
  const htmlText = await response.text();
  document.querySelector(".carousel-area").innerHTML = htmlText;
}

function AddCategoryComponent() {
  import('./categories/category.js')
  fetch("./categories/category.html")
    .then(response => {
      return response.text();
    })
    .then(data => {
      document.querySelector(".categories-area").innerHTML = data;
    });
}

async function AddFooterComponent() {
  import('./footer/footer.js');

  const response = await fetch("./footer/footer.html");
  const text = await response.text();
  document.querySelector(".footer-area").innerHTML = text;
  }


async function AddCartComponent() {
  import("./cart/cart.js");

  const response = await fetch("./cart/cart.html");
  const htmlText = await response.text();
  
  document.querySelector(".cart-wrapper").innerHTML += htmlText;
}



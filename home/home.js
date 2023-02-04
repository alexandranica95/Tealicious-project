AddCarouselComponent();
AddCategoryComponent();

function AddCarouselComponent() {
  import('./carousel/carousel.js')

  fetch("./carousel/carousel.html")
    .then(response => {
      return response.text();
    })
    .then(data => {
      document.querySelector(".carousel-area").innerHTML = data;
    });
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

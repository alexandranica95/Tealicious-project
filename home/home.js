import{ displayModal } from "../shared/product-detail/product-detail.js";

displayModal()

 await AddComponent("./carousel/carousel.js", "./carousel/carousel.html", ".carousel-area");
 await AddComponent("./categories/category.js", "./categories/category.html", ".categories-area");
 await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
 await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");
 await AddComponent("../shared/product-detail/product-detail.js", "../shared/product-detail/product-detail.html", ".product-detail-modal")
 
 async function AddComponent(javascriptPath, htmlPath, querySelector) {
  import(javascriptPath)

  const response = await fetch(htmlPath)
  const htmlText = await response.text();
  document.querySelector(querySelector).innerHTML += htmlText;
}


let categoryElements = document.querySelectorAll(".category-card");
categoryElements = Array.from(categoryElements);

categoryElements.forEach((elem, index) => {
  let categoryValue = ''
  if(index === 0 ){
    categoryValue = 'Bubble Tea'
  }

  else if(index === 1){
    categoryValue = 'Coffee'
  }

  else {
    categoryValue = 'Waffles'
  }

  elem.addEventListener('click', e => {
    window.location.href = '/products/products.html?category=' + categoryValue;
  })
})




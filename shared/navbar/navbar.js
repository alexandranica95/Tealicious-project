 
import{
  displayCart
} from '/shared/cart/cart.js'

 await AddComponent("/shared/cart/cart.js", "/shared/cart/cart.html", ".cart-wrapper" );
 async function AddComponent(javascriptPath, htmlPath, querySelector) {
    import(javascriptPath)
  
    const response = await fetch(htmlPath)
    const htmlText = await response.text();
    document.querySelector(querySelector).innerHTML += htmlText;
  }
  

  
setTimeout(function () {
  displayCart();
}, 1000);

let navbarProductCategoryElements = document.querySelectorAll(".navbar-products-category");
navbarProductCategoryElements = Array.from(navbarProductCategoryElements);

navbarProductCategoryElements.forEach(elem => {
  elem.addEventListener('click', e => {
    window.location.href = '/products/products.html?category=' + e.target.innerHTML;
  })
})
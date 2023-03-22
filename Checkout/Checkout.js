import { createCartElement, getDescription, calculateCartFinalPrice, calculateFinalNumberOfProducts } from '../shared/cart/cart.js';
import {getProductById} from '/data/backendservice.js'

await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");

async function AddComponent(javascriptPath, htmlPath, querySelector) {
    import(javascriptPath)
  
    const response = await fetch(htmlPath)
    const htmlText = await response.text();
    document.querySelector(querySelector).innerHTML += htmlText;
  }

  displayCheckout()
  function displayCheckout() {
    // update checkout Items
    let cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems')); //colectia din local storage
 
    if (cartItemsInLocalStorage !== null) {
       cartItemsInLocalStorage.forEach(elem => {
        createCheckoutProduct(elem);
       });
    }
 
    //update cart final price
    let checkoutFinalPrice = calculateCartFinalPrice();
    document.querySelector(".total-price > div").innerHTML = checkoutFinalPrice
    
    //update cart number of products
    let finalNumberOfProductsInCheckout = calculateFinalNumberOfProducts();
    document.querySelector(".number-of-products-cart :nth-child(2)").innerHTML = finalNumberOfProductsInCheckout 
 }


function createCheckoutProduct(checkoutCartData){
  const product = getProductById(checkoutCartData.id)

  const checkoutItem = document.createElement('div');
  checkoutItem.setAttribute ('class', 'cart-final-products-container');


  const productImageFinalCart = document.createElement('div');
  productImageFinalCart.setAttribute('class', 'product-image-final-cart');

  const checkoutImage = document.createElement('img');
  checkoutImage.setAttribute('src', product.pictureUrl);
  productImageFinalCart.appendChild(checkoutImage);

  checkoutItem.appendChild(productImageFinalCart);

  const productTitleAndToppings = document.createElement('div');
  productTitleAndToppings.setAttribute ('class', 'product-title-toppings');

  const checkoutProductName = document.createElement('div');
  checkoutProductName.setAttribute('class', 'title-of-product');
  checkoutProductName.textContent = product.title;
  
  productTitleAndToppings.appendChild(checkoutProductName);

  const toppingsSelected = document.createElement('div');
  toppingsSelected.setAttribute('class', 'topping-selected');
  toppingsSelected.textContent = getDescription(checkoutCartData.isBigGlass , checkoutCartData.toppingSelected);

  productTitleAndToppings.appendChild(toppingsSelected);
  checkoutItem.appendChild(productTitleAndToppings);

  const checkoutProductsQuantity = document.createElement('div');
  checkoutProductsQuantity.setAttribute('class', 'quantity-of-products');

  const xElement = document.createElement('div');
  xElement.textContent = "X";

  checkoutProductsQuantity.appendChild(xElement);

  const numberOfProduct = document.createElement('div');
  numberOfProduct.setAttribute('class', 'final-products-quantity');
  numberOfProduct.textContent = checkoutCartData.numberOfProducts;

  checkoutProductsQuantity.appendChild(numberOfProduct);
  checkoutItem.appendChild(checkoutProductsQuantity);

  const checkoutProductPrice = document.createElement('div');
  checkoutProductPrice.setAttribute('class', 'final-product-price');
  checkoutProductPrice.textContent = checkoutCartData.finalPrice + " lei";

  checkoutItem.appendChild(checkoutProductPrice);

  const lineBetweenProducts = document.createElement('div');
  lineBetweenProducts.setAttribute('class', 'line-between');

  const productCheckoutContainer = document.getElementsByClassName('checkout-products-container');
  productCheckoutContainer[0].appendChild(checkoutItem);
  productCheckoutContainer[0].appendChild(lineBetweenProducts);
}

const buttonCheckout = document.querySelector(".btn")
buttonCheckout.addEventListener("click", e =>{
 localStorage.removeItem('cartItems')
})
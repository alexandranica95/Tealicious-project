import {
   getProductById
} from '/data/backendservice.js'

setTimeout(function () {
   Run();
}, 1000);

function Run() {
   // event listener on product card
   addCardListeners();
   getToppingSelected();
   

   //quantity buttons event listeners
   const quantityButtonsElement = document.querySelector(".quantity-option");

   quantityButtonsElement.addEventListener("click", e => {
      if (e.target.classList.contains("first")) {
         Array.from(quantityButtonsElement.children).forEach(item => item.classList.remove("focus"));
         e.target.classList.add("focus");

      } else if (e.target.classList.contains("second")) {
         Array.from(quantityButtonsElement.children).forEach(item => item.classList.remove("focus"));
         e.target.classList.add("focus");
      }
      updateProductPrice();
   })

   //toppings buttons event listners
   const toppingButtonsElement = document.querySelectorAll(".topping-options .btn-option");
   Array.from(toppingButtonsElement).forEach(btn => {
      btn.addEventListener("click", e => {
         if (e.target.classList.contains("focus")) {
            e.target.classList.remove("focus");
         } else if (getToppingNumber() < 4) {
            e.target.classList.add("focus");
         }
         updateProductPrice();
      })

   })

   // + button event listeners
   document.querySelector(".plus-btn").addEventListener("click", function () {
      let quantityText = document.querySelector(".products-quantity").innerHTML;
      document.querySelector(".products-quantity").innerHTML = parseInt(quantityText) + 1;

      updateProductPrice();
   });


   // - button event listeners
   document.querySelector(".minus-btn").addEventListener("click", function () {
      let quantityText = document.querySelector(".products-quantity").innerHTML;
      if (parseInt(quantityText) > 1) {
         document.querySelector(".products-quantity").innerHTML = parseInt(quantityText) - 1;
        
         updateProductPrice();
      }
   });


   //store cart items in local storage
   const addToCartButton = document.querySelector(".add-to-cart-btn");
   addToCartButton.addEventListener("click", e => {
      const cartItem = storeCartItem();//obiectul pe care dau click
      const cartItems = JSON.parse(localStorage.getItem('cartItems'))//colectia din local storage
      const existentCartItem = cartItems.find(e => e.customId === cartItem.customId);//obiectul deja adaugat in local storage

      if(cartItems === "undefined" && cartItems === null){
         localStorage.setItem('cartItems',JSON.stringify([cartItem]))
      }
      else if(existentCartItem){
       existentCartItem.numberOfProducts += cartItem.numberOfProducts;
       localStorage.setItem('cartItems', JSON.stringify(cartItems))
      }
      else {
         cartItems.push(cartItem)
         localStorage.setItem('cartItems', JSON.stringify(cartItems))
      }
   });
}




//functions definition

function addCardListeners() {
   const cardElements = document.querySelectorAll(".card");
   const arrayOfCards = Array.from(cardElements);
   arrayOfCards.forEach(cardElement => {
      cardElement.addEventListener("click", e => {
         replaceProductDetails();
      });
   });
}

//
function replaceProductDetails() {
   const idProduct = localStorage.getItem('productId');
   const product = getProductById(idProduct); //ia id ul nou
   const modalContent = document.querySelector(".pop-up-content");
   modalContent.querySelector("img").src = product.pictureUrl;
   modalContent.querySelector(".paragraph").innerHTML = product.description;
   modalContent.querySelector(".title-description").innerHTML = product.title;
   modalContent.querySelector(".product-price").innerHTML = `${product.price}`;
}

function updateProductPrice() {
   const productDetails = getProductDetails(document);

   const finalPrice = calculatePrice(productDetails.initialPrice,
      productDetails.isBigGlass,
      productDetails.numberOfToppings,
      productDetails.numberOfProducts);

   document.querySelector(".product-price").innerHTML = finalPrice;
}

function calculatePrice(initialPrice, isBigGlass, numberOfToppings, numberOfProducts) {
   let finalPrice = initialPrice;
   if (isBigGlass === true) {
      finalPrice = finalPrice + 2
   }
   finalPrice = finalPrice + 2 * numberOfToppings;
   finalPrice = finalPrice * numberOfProducts;

   return finalPrice;
}

function getProductDetails(document) {
   const idProduct = localStorage.getItem('productId'); //get id of the product
   const product = getProductById(idProduct); //get product by the id
   

   const isBigGlass = getIsBigGlass();
   const numberOfToppings = getToppingNumber();
   const numberOfProducts = getNumberOfProducts();
   return {
      initialPrice: product.price,
      isBigGlass: isBigGlass,
      numberOfToppings: numberOfToppings,
      numberOfProducts: numberOfProducts
   }
}

function getIsBigGlass() {
   const quantityButtons = document.querySelectorAll(".quantity-option .btn-option");

   let isBigGlass = false;
   if (quantityButtons[1].classList.contains('focus')) {
      isBigGlass = true;
   }
   return isBigGlass;
}

function getNumberOfProducts() {
   return parseInt(document.querySelector(".products-quantity").innerHTML);
}

//numbers of topping selected
function getToppingNumber() {
   const toppingOption = document.querySelectorAll(".topping-options > .btn-option");
   let sumOfToppingsSelected = 0;

   Array.from(toppingOption).forEach(item => {
      if (item.classList.contains("focus")) {
         sumOfToppingsSelected = sumOfToppingsSelected + 1
      }
   });
   return sumOfToppingsSelected;
}

function getToppingSelected(){
   const toppingSelected = document.querySelectorAll(".topping-options > .btn-option.focus");
   const mappedToppings = Array.from(toppingSelected).map(item => { return item.innerHTML});
   return mappedToppings; 
}


function storeCartItem(){
   const productId = localStorage.getItem('productId')
   const NumberOfProducts = getNumberOfProducts();
   const finalPrice = document.querySelector(".product-price").innerHTML;
   const isBigGlass = getIsBigGlass();
   const toppingSelected = getToppingSelected();
   const CustomId = getCustomId(productId, toppingSelected, isBigGlass);
   return {
      id: productId,
      numberOfProducts: NumberOfProducts,
      finalPrice: finalPrice,
      isBigGlass: isBigGlass,
      toppingSelected: toppingSelected,
      customId: CustomId
   }
}

function getCustomId(id, toppingSelected, isBigGlass){
   
   let customId = " "
   customId = customId + id + "_"
   toppingSelected.sort().forEach(elem => {
      customId = customId + elem 
   })
   customId = customId + "_" + isBigGlass
   return customId 
}

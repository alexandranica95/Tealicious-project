import {
   getProductById
} from '/data/backendservice.js';

setTimeout(function () {
   Run();
}, 500);

function Run() {
   // event listener on product card
   // display cart Items

   addCardListeners();
   updateProductPrice();

   //quantity buttons event listeners
   const quantityButtonsElements = document.querySelectorAll(".quantity-option");

   Array.from(quantityButtonsElements).forEach(quantityButtonsElement => {
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
   });

   //toppings buttons event listners
   const toppingButtonsElement = document.querySelectorAll(".topping-options .btn-option");
   Array.from(toppingButtonsElement).forEach(btn => {
      btn.addEventListener("click", e => {
         const idProduct = localStorage.getItem('productId');
         const product = getProductById(idProduct); //ia id ul nou
         if (e.target.classList.contains("focus")) {
            e.target.classList.remove("focus");
         } else if (getToppingNumber(product.category) < 4) {
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
      const clickedCartItemData = getCartItem();//obiectul pe care dau click
      let cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems'))//colectia din local storage
      
      // set cart items to local storage, daca if-ul este adevarat nu se mai executa else
      if(cartItemsInLocalStorage === "undefined" || cartItemsInLocalStorage === null){
         cartItemsInLocalStorage = [clickedCartItemData];
         localStorage.setItem('cartItems', JSON.stringify(cartItemsInLocalStorage))
      }
      else{
         const existentCartItem = cartItemsInLocalStorage.find(e => e.customId === clickedCartItemData.customId);//obiectul deja adaugat in local storage
         if(existentCartItem){
            //updateaza nr de produse
            existentCartItem.numberOfProducts += clickedCartItemData.numberOfProducts;

            //updateaza pretul final
            const productDetails = getProductDetails();

            const finalPrice = calculatePrice(productDetails.initialPrice,
               productDetails.isBigGlass,
               productDetails.numberOfToppings,
               existentCartItem.numberOfProducts);

            existentCartItem.finalPrice = finalPrice;
            
            localStorage.setItem('cartItems', JSON.stringify(cartItemsInLocalStorage))
           }
           else {
              cartItemsInLocalStorage.push(clickedCartItemData)
              localStorage.setItem('cartItems', JSON.stringify(cartItemsInLocalStorage))
           }
      }

      //reload page
      window.location.href = '/products/products.html';
   });
}

//functions definition
function addCardListeners() {
   const cardElements = document.querySelectorAll(".card");
   const arrayOfCards = Array.from(cardElements);
   arrayOfCards.forEach(cardElement => {
      cardElement.addEventListener("click", e => {
         window.localStorage.setItem('productId', e.currentTarget.id) 
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

   const bubbleOptions = document.querySelectorAll('.bubble-options')
   Array.from(bubbleOptions).forEach(elem => {
      elem.style.display = "none";
   })

   const coffeeOptions = document.querySelectorAll('.coffee-options')
   Array.from(coffeeOptions).forEach(elem => {
      elem.style.display = "none";
   })

   const waffleOptions = document.querySelectorAll('.waffle-options')
   Array.from(waffleOptions).forEach(elem => {
      elem.style.display = "none";
   })

   if(product.category === 'bubbleTea'){
      Array.from(bubbleOptions).forEach(elem => {
         elem.style.display = "block";
      })
   }
   else if(product.category === 'coffee'){
      Array.from(coffeeOptions).forEach(elem => {
         elem.style.display = "block";
      })
   }
   else{
      Array.from(waffleOptions).forEach(elem => {
         elem.style.display = "block";
      })
   }
}

function updateProductPrice() {
   const productDetails = getProductDetails();

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

function getProductDetails() {
   const idProduct = localStorage.getItem('productId'); //get id of the product
   const product = getProductById(idProduct); //get product by the id
   
   
   const isBigGlass = getIsBigGlass(product.category);
   const numberOfToppings = getToppingNumber(product.category);
   const numberOfProducts = getNumberOfProducts();
   return {
      initialPrice: product.price,
      isBigGlass: isBigGlass,
      numberOfToppings: numberOfToppings,
      numberOfProducts: numberOfProducts
   }
}

function getIsBigGlass(category) {
   let quantityButtons;
   if(category === "bubbleTea"){
      quantityButtons = document.querySelectorAll(".quantity-option.bubble-options .btn-option");
   }

   else if(category === "coffee"){
      quantityButtons = document.querySelectorAll(".quantity-option.coffee-options .btn-option");
   }

   else{
      quantityButtons = document.querySelectorAll(".quantity-option.waffle-options .btn-option");
   }

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
function getToppingNumber(category) {

   let toppingOption;
   let sumOfToppingsSelected = 0;
   if( category === "bubbleTea"){
      toppingOption = document.querySelectorAll(".topping-options.bubble-options > .btn-option");
   }
   
   else if( category === "coffee"){
      toppingOption = document.querySelectorAll(".topping-options.coffee-options > .btn-option");

   }

   else{
      toppingOption = document.querySelectorAll(".topping-options.waffle-options > .btn-option");

   }
   
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


function getCartItem(){
   const productId = localStorage.getItem('productId')
   const product = getProductById(productId);
   const NumberOfProducts = getNumberOfProducts();
   const finalPrice = document.querySelector(".product-price").innerHTML;
   const isBigGlass = getIsBigGlass(product.category);
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

//click modal popup
export function displayModal() {
   document.addEventListener('click', function(event) {
      const modalContainerElement = document.getElementsByClassName("product-detail-modal")[0];
      const modalContentElement = document.getElementsByClassName("pop-up-content")[0];
      const cardElements = Array.from(document.getElementsByClassName("card"));
   
      const cardsClicked = cardElements.filter(card => card.contains(event.target)).length;

      if (modalContentElement.contains(event.target)) {
   
      }
      else if(cardsClicked > 0 ) {
         modalContainerElement.style.display = "block";
         document.querySelector("body").style.overflow = "hidden";

      }
      else{
         modalContainerElement.style.display = "none";
         document.querySelector("body").style.overflow = "scroll";
      }
 })};

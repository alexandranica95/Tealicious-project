import {getProductById} from '/data/backendservice.js'
export function createCartElement(cartItemData)
{
    const product = getProductById(cartItemData.id);

    const cartItem = document.createElement('div');
    cartItem.setAttribute ('class', 'cart-item');

    const itemImage = document.createElement('img');
    itemImage.setAttribute( 'src', product.pictureUrl);
    cartItem.appendChild(itemImage)

    const productNameAndDescripion = document.createElement('div');
    productNameAndDescripion.setAttribute ('class', 'cart-product-name-description');

    const productName = document.createElement('div');
    productName.setAttribute ('class', 'cart-product-name');
    productName.textContent = product.title;
    productNameAndDescripion.appendChild(productName)

    const productDescription = document.createElement('div');
    productDescription.setAttribute ('class', 'cart-product-description');
    productDescription.textContent = getDescription(cartItemData.isBigGlass , cartItemData.toppingSelected, product.category);

    productNameAndDescripion.appendChild(productDescription)
    
    cartItem.appendChild(productNameAndDescripion)

    const productPrice = document.createElement('div');
    productPrice.setAttribute ('class', 'cart-price');
    productPrice.textContent = cartItemData.finalPrice + ' lei';
    cartItem.appendChild(productPrice)

    const cartButton = document.createElement('div');
    cartButton.setAttribute ('class', 'cart-button');
    cartItem.appendChild(cartButton);

    const number = document.createElement('div');
    number.setAttribute ('class', 'number');

    const minus = document.createElement('div');
    minus.setAttribute ('class', 'minus');
    minus.textContent = "-";
    number.appendChild(minus);


    const textNumber = document.createElement('input');
    textNumber.setAttribute ('type', 'text');
    textNumber.setAttribute ('value', cartItemData.numberOfProducts);  // caerItem.numberOfPr
    number.appendChild(textNumber);

    const plus = document.createElement('div');
    plus.setAttribute ('class', 'plus');
    plus.textContent = "+";
    number.appendChild(plus);

    //
    cartButton.appendChild(number);

    // add button
    cartItem.appendChild(cartButton);


    // add element in html cart
    const productContainer = document.getElementsByClassName('cart-items');
    productContainer[0].appendChild(cartItem);
}


//calculating the final price to show in cart
export function calculateCartFinalPrice() {

    let cartItems = localStorage.getItem('cartItems');
    cartItems = JSON.parse(cartItems);
    let finalPriceOnCart = 0;

    if (cartItems !== null) {
        cartItems.forEach( elem => {
            finalPriceOnCart = finalPriceOnCart + parseInt(elem.finalPrice)
        })
    }

    return finalPriceOnCart
} 

//calculating the final number of products on cart
export function calculateFinalNumberOfProducts() {

    let cartItems = localStorage.getItem('cartItems');
    cartItems = JSON.parse(cartItems);

    let cartFinalNumberOfProductsInCart = 0;

    if (cartItems !== null) {
        cartItems.forEach( elem => {
            cartFinalNumberOfProductsInCart = cartFinalNumberOfProductsInCart + elem.numberOfProducts
        })
    }

    return cartFinalNumberOfProductsInCart
} 


export function displayCart() {
    // update cart Items
    let cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems')); //colectia din local storage
 
    if (cartItemsInLocalStorage !== null) {
       cartItemsInLocalStorage.forEach(elem => {
          createCartElement(elem);
       });
    }
 
    //update cart final price
    let cartFinalPrice = calculateCartFinalPrice()
    document.querySelector("h3.heading").innerHTML = 'Total ' + cartFinalPrice + ' lei'
    
    //update cart number of products
    let cartFinalNumberOfProductsInCart = calculateFinalNumberOfProducts()
    document.querySelector(".cart-wrapper .badge").setAttribute("value", cartFinalNumberOfProductsInCart)
 
 }


 export function getDescription(isBigGlass, arrayOfToppings, category){

    let productDescription = ''
    if(isBigGlass){
        if(category === 'bubbleTea'){
            productDescription = '500 ml'
        }
        else if(category === 'coffee'){
            productDescription = '300 ml'
        }
        else{
            productDescription = '450 g'
        }
    }
    else{
        if(category === 'bubbleTea'){
            productDescription = '350 ml'
        }
        else if(category === 'coffee'){
            productDescription = '120 ml'
        }
        else{
            productDescription = '300 g'
        }
    }

    arrayOfToppings.forEach(topping => {
        productDescription = productDescription + ' ' + topping
    });
    
    return productDescription;
 }
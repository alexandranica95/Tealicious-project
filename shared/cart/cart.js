import {getProductById} from '/data/backendservice.js'
export function createCartElement(cartItemData)
{
    const product = getProductById(cartItemData.id);

    const cartItem = document.createElement('div');
    cartItem.setAttribute ('class', 'cart-item');

    const itemImage = document.createElement('img');
    itemImage.setAttribute( 'src', product.pictureUrl);
    cartItem.appendChild(itemImage)

    const productName = document.createElement('div');
    productName.setAttribute ('class', 'cart-product-name');
    productName.textContent = product.title;
    cartItem.appendChild(productName)

    const productPrice = document.createElement('div');
    productPrice.setAttribute ('class', 'cart-price');
    productPrice.textContent = cartItemData.finalPrice;
    cartItem.appendChild(productPrice)

    const cartButton = document.createElement('div');
    cartButton.setAttribute ('class', 'cart-button');
    cartItem.appendChild(cartButton);

    const number = document.createElement('div');
    number.setAttribute ('class', 'number');

    const minus = document.createElement('span');
    minus.setAttribute ('class', 'minus');
    minus.textContent = "-";
    number.appendChild(minus);


    const textNumber = document.createElement('input');
    textNumber.setAttribute ('type', 'text');
    textNumber.setAttribute ('value', cartItemData.numberOfProducts);  // caerItem.numberOfPr
    number.appendChild(textNumber);

    const plus = document.createElement('span');
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

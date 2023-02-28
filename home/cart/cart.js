export function createCartElement(){
    const cartItem = document.createElement('div');
    cartItem.setAttribute ('class', 'cart-item');

    const itemImage = document.createElement('img');
    itemImage.setAttribute ('class', 'cart-img')
    cartItem.appendChild(itemImage)

    const productName = document.createElement('div');
    productName.setAttribute ('class', 'cart-product-name');
    productName.textContent = "Bubble Tea";
    cartItem.appendChild(productName)

    const productPrice = document.createElement('div');
    productPrice.setAttribute ('class', 'product-price');
    productPrice.textContent = "22 lei";
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
    textNumber.setAttribute ('value', '1');
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

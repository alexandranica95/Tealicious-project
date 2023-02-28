 await AddComponent("/shared/cart/cart.js", "/shared/cart/cart.html", ".cart-wrapper" );
 async function AddComponent(javascriptPath, htmlPath, querySelector) {
    import(javascriptPath)
  
    const response = await fetch(htmlPath)
    const htmlText = await response.text();
    document.querySelector(querySelector).innerHTML += htmlText;
  }
  
  
  
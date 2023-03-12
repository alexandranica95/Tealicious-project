 await AddComponent("./carousel/carousel.js", "./carousel/carousel.html", ".carousel-area");
 await AddComponent("./categories/category.js", "./categories/category.html", ".categories-area");
 await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
 await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");

 async function AddComponent(javascriptPath, htmlPath, querySelector) {
  import(javascriptPath)

  const response = await fetch(htmlPath)
  const htmlText = await response.text();
  document.querySelector(querySelector).innerHTML += htmlText;
}




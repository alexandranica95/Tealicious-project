await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");

await AddCardComponent();

async function AddComponent(javascriptPath, htmlPath, querySelector) {
  import(javascriptPath)

  const response = await fetch(htmlPath)
  const htmlText = await response.text();
  document.querySelector(querySelector).innerHTML += htmlText;
 }

async function AddCardComponent() {
  import("../shared/card/card.js");

  const response = await fetch("../shared/card/card.html");
  const htmlText = await response.text();

  for (let i = 0; i < 8; i++){
    document.querySelector(".fruit-tea-products").innerHTML += htmlText;
  }

  for (let i = 0; i < 6; i++){
    document.querySelector(".milk-tea-products").innerHTML += htmlText;
  }

  for (let i = 0; i < 10; i++){
    document.querySelector(".cheesecake-products").innerHTML += htmlText;
  }
}

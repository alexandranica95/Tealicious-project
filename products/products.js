import {
  getAllFruitTeaProducts,
  getAllMilkTeaProducts,
  getAllCheesecakeProducts,
  getAllCoffeeProducts,
  getAllSpecialCoffeeProducts,
  getAllWaffleProducts
} from '/data/backendservice.js'
import("../shared/card/card.js");

await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");

await AddBubbleTea();
await AddCoffee();
await AddWaffle();

filterProducts();

async function AddBubbleTea() {
  await AddFruitTea();
  await AddMilkTea();
  await AddCheeseCake();
}

async function AddCoffee() {
  await AddStandardCoffee();
  await AddSpecialCoffee();
}

async function AddFruitTea() {
  //iau componenta card html, // iau lista de produse fruit tea
  const fruitTeaProducts = await getAllFruitTeaProducts(); //diferit
  await AddSubcategoryProducts(fruitTeaProducts, ".fruit-tea-products");
}

async function AddMilkTea() {
  //iau componenta card html, // iau lista de produse fruit tea
  const milkTeaProducts = await getAllMilkTeaProducts();
  await AddSubcategoryProducts(milkTeaProducts, ".milk-tea-products");
}


async function AddCheeseCake() {
  //iau componenta card html, // iau lista de produse fruit tea
  const cheesecakeProducts = await getAllCheesecakeProducts();
  await AddSubcategoryProducts(cheesecakeProducts, ".cheesecake-products");
}


async function AddStandardCoffee() {
  //iau componenta card html, // iau lista de produse fruit tea
  const coffeeProducts = await getAllCoffeeProducts();
  await AddSubcategoryProducts(coffeeProducts, ".coffee-products");
}

async function AddSpecialCoffee() {
  const SpecialCoffeeProducts = await getAllSpecialCoffeeProducts();
  await AddSubcategoryProducts(SpecialCoffeeProducts, ".special-coffee-products");

}

async function AddWaffle() {
  const waffleProducts = await getAllWaffleProducts();
  await AddSubcategoryProducts(waffleProducts, ".waffle-products");
}


async function AddComponent(javascriptPath, htmlPath, querySelector) {
  import(javascriptPath)

  const response = await fetch(htmlPath)
  const htmlText = await response.text();
  document.querySelector(querySelector).innerHTML += htmlText;
}


async function AddSubcategoryProducts(products, productsSectionSelector) {
  const response = await fetch("/shared/card/card.html"); //la fel
  const defaultCardHtml = await response.text(); //la fel

  //intr un for generez default cards cate am in lista de fruit tea
  for (let i = 0; i < products.length; i++) {
     const productsSection = document.querySelector(productsSectionSelector);
     productsSection.innerHTML += defaultCardHtml;

     const cardElement = productsSection.querySelector(`.card:nth-child(${ i+1 })`);
     const productData = products[i];

     cardElement.querySelector(".title").innerHTML = productData.title;
     cardElement.querySelector("img").src = productData.pictureUrl;
     cardElement.querySelector(".price").innerHTML = `${productData.price} lei`;
     cardElement.querySelector(".description").innerHTML = productData.description;
  }
}


//filter products

  function filterProducts(){
  showBubbleTea();

  //category
  const categoryCard = document.querySelectorAll(".category-button"); //am pus mana pe toate butoanele (bubbletea, coffee, waffle)
  const categoryButtonArray = Array.from(categoryCard); //am transformat nodelist in array
  
  categoryButtonArray[0].addEventListener("click", showBubbleTea);
  categoryButtonArray[1].addEventListener("click", showCoffee );
  categoryButtonArray[2].addEventListener("click", showWaffle );
  
  //sucategory
  const subcategoryProducts = document.querySelector(".select-product");
  subcategoryProducts.addEventListener("change", showSubcategory)

}

function showSubcategory(event) {
  console.log(event.target.value);
  let bubbleTeaElements = document.querySelectorAll(".products-container > .buble-tea-display");
  bubbleTeaElements = Array.from(bubbleTeaElements);

  let coffeeElements = document.querySelectorAll(".products-container >.coffee-display");
  coffeeElements = Array.from(coffeeElements);

  let waffleElements = document.querySelectorAll(".products-container >.waffle-display");
  waffleElements = Array.from(waffleElements);

  const allElements = bubbleTeaElements.concat(coffeeElements).concat(waffleElements);
  allElements.forEach(element => { 
    element.style.display = "none";
  });

  if (event.target.value === "All Bubble Teas") {
    const bubbleTeaSubcategory = document.querySelectorAll(".products-container > .buble-tea-display");
    bubbleTeaSubcategory.forEach(element => { 
      element.style.display = "block";
    });
  } 

  if (event.target.value === "Fruit tea") {
   const fruitTeaSubcategory = document.querySelector(".fruit-tea-container");
   fruitTeaSubcategory.style.display = "block";
  }

  if (event.target.value === "Milk tea") {
    const milkTeaSubcategory = document.querySelector(".milk-tea-container");
    milkTeaSubcategory.style.display = "block";
   }

   if (event.target.value === "Cheesecakes") {
    const cheesecakeSubcategory = document.querySelector(".cheesecake-container");
    cheesecakeSubcategory.style.display = "block";
    
   }
}

function showBubbleTea() {
  let bubbleTeaElements = document.querySelectorAll(".buble-tea-display");
  bubbleTeaElements = Array.from(bubbleTeaElements);
  
  let coffeeElements = document.querySelectorAll(".coffee-display");
  coffeeElements = Array.from(coffeeElements);

  let waffleElements = document.querySelectorAll(".waffle-display");
  waffleElements = Array.from(waffleElements);

  const allElements = bubbleTeaElements.concat(coffeeElements).concat(waffleElements);
  allElements.forEach(element => { 
    element.style.display = "none";
  });

  bubbleTeaElements[0].selected = true;
  bubbleTeaElements.forEach(element => {
    element.style.display = "block";
  });

}

function showCoffee() {
  //for select option
  let bubbleTeaElements = document.querySelectorAll(".buble-tea-display");
  bubbleTeaElements = Array.from(bubbleTeaElements);
  
  let coffeeElements = document.querySelectorAll(".coffee-display");
  coffeeElements = Array.from(coffeeElements);

  let waffleElements = document.querySelectorAll(".waffle-display");
  waffleElements = Array.from(waffleElements);

  const allOptions = bubbleTeaElements.concat(coffeeElements).concat(waffleElements);

  allOptions.forEach(element => { 
    element.style.display = "none";
  });
 
  coffeeElements[0].selected = true;
  coffeeElements.forEach(element => {
    element.style.display = "block";
  });

}

function showWaffle() {
  //for select option
  let bubbleTeaElements = document.querySelectorAll(".buble-tea-display");
  bubbleTeaElements = Array.from(bubbleTeaElements);
  
  let coffeeElements = document.querySelectorAll(".coffee-display");
  coffeeElements = Array.from(coffeeElements);

  let waffleElements = document.querySelectorAll(".waffle-display");
  waffleElements = Array.from(waffleElements);

  const allOptions = bubbleTeaElements.concat(coffeeElements).concat(waffleElements);

  allOptions.forEach(element => { 
    element.style.display = "none";
  });

  waffleElements[0].selected = true;
  waffleElements.forEach(element => {
    element.style.display = "block";
  });
}
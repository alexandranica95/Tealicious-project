import  {getAllLimitedEditionProducts} from '/data/backendservice.js'
import {getAllNewArrivalsProducts} from '/data/backendservice.js'
import {getAllBestsellersProducts} from '/data/backendservice.js'
//carousel automatic click with time
// const buttonsWrapper = document.querySelector(".map");
// let array = Array.from(buttonsWrapper?.children);
// for(let i = 0; i < array.length; i++){
//   setInterval(function () {
//     array[i].click();
//   }, 3000*(i+1));
// }


setTimeout(function () {
  Run();
}, 1000);


function Run(){
  //loads dynamically the Card Component
  const buttonsWrapper = document.querySelector(".map");
  const slides = document.querySelector(".bubble-tea-products");
  
  buttonsWrapper.addEventListener("click", e => {
    if (e.target.nodeName === "BUTTON") {
      Array.from(buttonsWrapper.children).forEach(item =>
        item.classList.remove("active")
      );
      if (e.target.classList.contains("first")) {
        slides.style.transform = "translateX(-0%)";
        e.target.classList.add("active");
      } else if (e.target.classList.contains("second")) {
        slides.style.transform = "translateX(-87.5%)";
        e.target.classList.add("active");
      } else if (e.target.classList.contains('third')){
        slides.style.transform = 'translatex(-175%)';
        e.target.classList.add('active');
      }
    }
  });
  
  const productsWrapper = document.querySelector(".bar-container")
  const bubbleTeaProducts = Array.from(document.querySelector(".wrapper-carousel").children);
  const mapElement = document.querySelector(".map");
  
  productsWrapper.addEventListener("click", e => {
    Array.from(productsWrapper.children).forEach(item => item.classList.remove("focus"));
    
    if (e.target.classList.contains("first")) {
      bubbleTeaProducts[0].classList.remove("display-none")
      mapElement.classList.remove("display-none");
      e.target.classList.add("focus");
  
      bubbleTeaProducts[1].classList.add("display-none")
      bubbleTeaProducts[2].classList.add("display-none")
    } else if (e.target.classList.contains("second")) {
      bubbleTeaProducts[1].classList.remove("display-none")
      e.target.classList.add("focus");
  
      mapElement.classList.add("display-none");
      bubbleTeaProducts[0].classList.add("display-none")
      bubbleTeaProducts[2].classList.add("display-none")
    } else if (e.target.classList.contains('third')){
      bubbleTeaProducts[2].classList.remove("display-none")
      e.target.classList.add("focus");
      
      mapElement.classList.add("display-none");
      bubbleTeaProducts[0].classList.add("display-none")
      bubbleTeaProducts[1].classList.add("display-none")
    }
  })
}


addLimitedEditionProductsToCarousel();

async function addLimitedEditionProductsToCarousel(){
  const leProducts = await getAllLimitedEditionProducts();
  const response = await fetch("../../shared/card/card.html");
  const defaultCardHtml = await response.text();
  
  for (let i = 0; i < leProducts.length; i++){
    const limitedEditionSection = document.querySelector("#limited-edition");
    limitedEditionSection.innerHTML += defaultCardHtml;

    const cardElement = limitedEditionSection.querySelector(`.card:nth-child(${ i+1 })`);
    const productData = leProducts[i];

    cardElement.querySelector(".title").innerHTML = productData.title ; 
    cardElement.querySelector("img").src = productData.pictureUrl;
    cardElement.querySelector(".price").innerHTML = `${productData.price} lei`;
    cardElement.querySelector(".description").innerHTML = productData.description;
    
    cardElement.setAttribute("id", productData.id);
  }

}

addNewArrivalProductsToCarousel();

  async function addNewArrivalProductsToCarousel(){
    const naProducts = await getAllNewArrivalsProducts();
    const response = await fetch("../../shared/card/card.html");
    const defaultCardHtml = await response.text();

    for (let i = 0; i < naProducts.length; i++){
      const newArrivalSection = document.querySelector("#new-arrivals");
      newArrivalSection.innerHTML += defaultCardHtml;
    
      const cardElement = newArrivalSection.querySelector(`.card:nth-child(${ i+1 })`);
      const productData = naProducts[i];

    cardElement.querySelector(".title").innerHTML = productData.title ; 
    cardElement.querySelector("img").src = productData.pictureUrl;
    cardElement.querySelector(".price").innerHTML = `${productData.price} lei`;
    cardElement.querySelector(".description").innerHTML = productData.description;

    
    cardElement.setAttribute("id", productData.id);
    }
}


addBestsellersToCarousel();
  async function addBestsellersToCarousel(){
    const bestSellersProducts = await getAllBestsellersProducts();
    const response = await fetch("../../shared/card/card.html");
    const defaultCardHtml = await response.text();

    for (let i = 0; i < bestSellersProducts.length; i++){
      const bestSellersSection = document.querySelector("#best-sellers");
      bestSellersSection.innerHTML += defaultCardHtml;
    
      const cardElement = bestSellersSection.querySelector(`.card:nth-child(${ i+1 })`);
      const productData = bestSellersProducts[i];

    cardElement.querySelector(".title").innerHTML = productData.title ; 
    cardElement.querySelector("img").src = productData.pictureUrl;
    cardElement.querySelector(".price").innerHTML = `${productData.price} lei`;
    cardElement.querySelector(".description").innerHTML = productData.description;

    
    cardElement.setAttribute("id", productData.id);
    }
}


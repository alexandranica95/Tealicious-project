
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
      slides.style.transform = "translateX(-33.33333333333333%)";
      e.target.classList.add("active");
    } else if (e.target.classList.contains('third')){
      slides.style.transform = 'translatex(-66.6666666667%)';
      e.target.classList.add('active');
    }
  }
});

const productsWrapper = document.querySelector(".bar-container")
const bubbleTeaProducts = Array.from(document.querySelector(".wrapper").children);
const mapElement = document.querySelector(".map");

productsWrapper.addEventListener("click", e => {
  Array.from(productsWrapper.children).forEach(item => item.classList.remove("focus"));
  e.target.classList.add("focus");
  if (e.target.classList.contains("first")) {
    bubbleTeaProducts[0].classList.remove("display-none")
    mapElement.classList.remove("display-none");

    bubbleTeaProducts[1].classList.add("display-none")
    bubbleTeaProducts[2].classList.add("display-none")
  } else if (e.target.classList.contains("second")) {
    bubbleTeaProducts[1].classList.remove("display-none")

    mapElement.classList.add("display-none");
    bubbleTeaProducts[0].classList.add("display-none")
    bubbleTeaProducts[2].classList.add("display-none")
  } else if (e.target.classList.contains('third')){
    bubbleTeaProducts[2].classList.remove("display-none")

    mapElement.classList.add("display-none");
    bubbleTeaProducts[0].classList.add("display-none")
    bubbleTeaProducts[1].classList.add("display-none")
  }
})
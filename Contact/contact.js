import {sendEmail} from "/services/emailService.js"
await AddComponent("../shared/footer/footer.js", "../shared/footer/footer.html", ".footer-area");
await AddComponent("../shared/navbar/navbar.js", "../shared/navbar/navbar.html", ".navbar-area");

async function AddComponent(javascriptPath, htmlPath, querySelector) {
    import(javascriptPath)
  
    const response = await fetch(htmlPath)
    const htmlText = await response.text();
    document.querySelector(querySelector).innerHTML += htmlText;
  }


document.querySelector(".button-submit").addEventListener('click', e => {
const fromName = document.querySelector("#fname").value
const fromEmail = document.querySelector("#email").value
const message = document.querySelector("#subject").value

sendEmail(fromName, fromEmail, message)

})
export function sendEmail(fromName, fromEmail, message){
    emailjs.init("Q8Z6dNthmFFC63DjC"); //please encrypted user id for malicious attacks
    //set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
    var templateParams = {
       from_name: fromName,
       from_email: fromEmail,
       message: message
    };

    emailjs.send('service_yxbqgaq', 'template_q7ko1hx', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Am primit email-ul dumneavoastra si vom raspunde in cel mai scurt timp.')
        window.location.href = '/home/home.html'
  }, function(error) {
    console.log('FAILED...', error);
    alert('Erroare la trimitere email.')
    window.location.href = '/home/home.html'

  });
}
const submitBtn = document.getElementById('frmbtn');

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

// main funtion, so we can use return and improve performance
const mainFunction = () => {
  // get verify parameter from url
  const verificationCode = getParameterByName("verify");

  // if verify is null then don do rest of the page
  if (verificationCode === null) {
    alert("Expired verification page");
    return;
  }

  // if verify is not null continue from here
  let verificationStatus = getVerificationStatus(verificationCode);
  if (!verificationStatus.iscodevalid) {
    alert("Expired verification page");
    return;
  } else {
    setVerificationStrings(
      verificationStatus.codedmail,
      verificationStatus.secremain
    );

    countdown();
  }
};

/* 
  this func makse an API request with verificationCode and retuns 
  an object
  - iscodevalid : true-false
  - codedmail: "as***as@gmail.com"
  - secremain: 36
  */
const getVerificationStatus = (verificationCode) => {
  let response = {
    iscodevalid: true,
    codedmail: "jo****04@gmail.com",
    secremain: 10,
  };

  //make the API request

  return response;
};

/*
this func makes an API request with mail and return verification code
*/
const getVerificationCode = (mail) => {
  let response = "sdf6sdf6sadf6";

  //make the API request

  return response;
};

const setVerificationStrings = (codedmail, secremain) => {
  //define dom objects
  const messageText = document.getElementById("message");
  const seccondsText = document.getElementById("secconds");

  // assing text to dom objects
  messageText.innerHTML = `A 6 - digit code has been sent to your email at ${codedmail} <span id="changemail" class="btn"> Change </span>`;
  seccondsText.textContent = secremain;

  //start count down
  countdown();
};

const countdown = () => {
  const spanElement = document.getElementById("secconds");
  let seconds = parseInt(spanElement.innerText);

  var countdownInterval = setInterval(function () {
    seconds--;

    spanElement.innerText = seconds;

    if (seconds === 0) {
      //stop count down
      clearInterval(countdownInterval); // Sayacı durdur
      
      //disable submit button
      disableSubmit();
    }
  }, 1000);
};


const disableSubmit = () => {
  submitBtn.disabled = true;
}

const enableSubmit = () => {
  submitBtn.disabled = false;
}

// call the main func.
mainFunction();

//define dom objects
const mailInput = document.getElementById("mail");
const mailInputError = document.getElementById("errmail");

const passInput = document.getElementById("password");
const passInputError = document.getElementById("errpassword");
const pwdstrengthSpan = document.getElementById("pwdstrength");

const userTypeInput = document.getElementById("usertype");
const userTypeError = document.getElementById("errusertype");

const submintBtn = document.getElementById("frmbtn");

passInput.addEventListener("input", () => {
  const password = passInput.value;
  const passwordStrength = checkPasswordStrength(password);
  showPassWordStength(passwordStrength);
});

const checkPasswordStrength = (password) => {
  let result = "";
  // trim the password
  password = password.trim();

  /*define regex */
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  /*define regex END*/

  let passwordLength = password.length;
  let strength = 0;

  // if has lowecase add 1 to strength
  if (lowercaseRegex.test(password)) {
    strength++;
  }

  // if has uppercase add 1 to strength
  if (uppercaseRegex.test(password)) {
    strength++;
  }

  // if has number add 1 to strength
  if (digitRegex.test(password)) {
    strength++;
  }

  // if has chars add 2 to strength
  if (specialCharRegex.test(password)) {
    strength++;
    strength++;
  }

  // length shorter then 8 it is week
  if (passwordLength <= 7) {
    result = "week";
  }
  //betwen 8 and 15 check
  else if (passwordLength > 7 && passwordLength <= 15) {
    if (strength < 3) {
      result = "week";
    } else if (strength === 3) {
      result = "medium";
    } else {
      result = "strong";
    }
  }
  // length longer than 20 strong
  else if (passwordLength > 20) {
    result = "strong";
  }
  //betwen 15 and 20 check
  else {
    if (strength < 2) {
      result = "week";
    } else if (strength === 2) {
      result = "medium";
    } else {
      result = "strong";
    }
  }

  return result;
};

const showPassWordStength = (strength) => {
  // clean the span
  pwdstrengthSpan.textContent = "";
  pwdstrengthSpan.classList = [];

  // create the span content
  switch (strength) {
    case "week":
      pwdstrengthSpan.textContent = "Week";
      pwdstrengthSpan.classList.add("week");
      break;

    case "medium":
      pwdstrengthSpan.textContent = "Medium";
      pwdstrengthSpan.classList.add("medium");
      break;

    case "strong":
      pwdstrengthSpan.textContent = "Strong";
      pwdstrengthSpan.classList.add("strong");
      break;
  }
};

const checkIsMail = (mail) => {
  let result = false;
  mail = mail.trim().toLowerCase();

  const mailRegex =
    /^([a-zA-Z0-9\-_\.]{1,50})@([a-zA-Z0-9\-_]{1,50})\.([a-zA-Z0-9\-_]{1,10})(\.(['a-z''A-Z''0-9''\-_]{1,5}))?$/;

  if (mailRegex.test(mail)) {
    result = true;
  }

  return result;
};

const checkIsAlreadyMember = (mail) => {
  let result = false;
  // connect to API and check if this mail is already a member
  return result;
};

submintBtn.addEventListener("click", () => {
  const mail = mailInput.value;
  const password = passInput.value;

  //clean previus errors
  mailInput.removeAttribute("aria-invalid");
  mailInputError.textContent = "";
  passInput.removeAttribute("aria-invalid");
  passInputError.textContent = "";
  userTypeInput.removeAttribute("aria-invalid");
  userTypeError.textContent = "";

  // check is mail
  if (!checkIsMail(mail)) {
    mailInput.setAttribute("aria-invalid", "true");
    mailInputError.textContent = `Please enter a valid email address`;
    return;
  }

  // check is mail registerd
  if (checkIsAlreadyMember(mail)) {
    mailInput.setAttribute("aria-invalid", "true");
    mailInputError.innerHTML = `This mail already registerd, please <a href="login.html">Login</a>`;
    return;
  }

  // check is password not week
  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength === "week") {
    passInput.setAttribute("aria-invalid", "true");
    passInputError.textContent = `Please use stronger password`;
    return;
  }

  // if there is no error post data to second stage
  const userType = userTypeInput.value;
  const postData = {
    mail,
    password,
  };
  switch (userType) {
    case "patient":
      posToPatientPage(postData);
      break;
    case "doctor":
      posToDoctorPage(postData);
      break;
    default: // give an error
      userTypeInput.setAttribute("aria-invalid", "true");
      passInputError.textContent = `Please select one`;
      break;
  }
});

const posToPatientPage = (postData) => {
  const url = "/registerpatient.html";
  postToPage(postData, url);
};

const posToDoctorPage = (postData) => {
  const url = "/registerdoctor.html";
  postToPage(postData, url);
};

const postToPage = (postData, url) => {
  // Create a form element
  var form = document.createElement("form");

  // Set the form attributes
  form.method = "post";
  form.action = url;

  // Add hidden input fields for each key-value pair in postData
  for (var key in postData) {
    if (postData.hasOwnProperty(key)) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = postData[key];
      form.appendChild(input);
    }
  }
  // Append the form to the document body
  document.body.appendChild(form);

  // Submit the form
  form.submit();

  // remove the form from the document after submission
  document.body.removeChild(form);
};

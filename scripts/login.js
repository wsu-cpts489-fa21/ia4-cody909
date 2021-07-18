const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const errBox = document.getElementById("errorBox");
const emailErr = document.getElementById("emailError");
const passwordErr = document.getElementById("passwordError");

loginForm.addEventListener("submit",function(e) {
    e.preventDefault();
    let emailValid = !emailField.validity.typeMismatch && !emailField.validity.valueMissing;
   let passwordValid = !passwordField.validity.patternMismatch && !passwordField.validity.valueMissing;
   if (emailValid && passwordValid) {
      errBox.classList.add("hidden");
      emailErr.classList.add("hidden");
      passwordErr.classList.add("hidden");
      return;
   }
   errBox.classList.remove("hidden");
   if (!emailValid) {
       emailErr.classList.remove("hidden");
       emailErr.focus();
   } else {
       emailErr.classList.add("hidden");
   }
   if (!passwordValid) {
       passwordErr.classList.remove("hidden");
       if (emailValid) {
            passwordErr.focus();
       }
   } else {
       passwordErr.classList.add("hidden");
   } 
});
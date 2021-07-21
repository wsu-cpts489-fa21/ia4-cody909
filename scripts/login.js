/*************************************************************************
 * login.js -- This file contains the global variables and functions 
 * to support the log in page
*************************************************************************/

/*************************************************************************
 * @function resetLoginForm
 * @desc 
 * After a user successfully logs in, this function should be called to
 * reset the form to its default state. 
 * @global errBox: The <div> containing the list of error messages
 * @global emailField: The form's email field
 * @global passwordField: The form's password field
 * @global emailErr: The error message for the email field
 * @global loginBtnIcon: The Log In button's icon
 * @global loginBtn: The Log In button
 *************************************************************************/
function resetLoginForm() {
    document.title = "Login in to SpeedScore";
    errBox.classList.add("hidden");
    emailErr.classList.add("hidden");
    passwordErr.classList.add("hidden");
    emailField.value = "";
    passwordField.value = "";
    loginBtnIcon.classList.remove("fa-spinner", "fa-spin");
    loginBtnIcon.classList.add("fa-sign-in-alt");
    loginBtn.setAttribute("aria-busy","false");
}

/*************************************************************************
 * @function loginFinish
 * @desc 
 * When a user is successfully authenticated, this function resets the 
 * login form and configure the app's initial state and appearance. 
 * The login page is hidden and the default app mode ("Feed") is displayed. 
 * @global loginPage: The login page <div>
 * @global modeTabsContainer: The <div> containing the mode tabs
 * @global modeTabPanels: Array of tab panels associated with each mode
 * @global currentMode: Integer index indicating current mode 
 * @global searchBtn: The search button in the top banner bar
 * @global profileBtn: The profile picture button in the top banner bar
 *************************************************************************/
function loginFinish(userId) {
    //1. Reset the login form in case user logs in again
    resetLoginForm();
    //2. Reset state of app with user logged in.
    loginPage.classList.add("hidden");
    modeTabsContainer.classList.remove("hidden");
    modeTabPanels[currentMode].classList.remove("hidden");
    menuBtn.classList.remove("hidden");
    searchBtn.classList.remove("hidden");
    profileBtn.classList.remove("hidden");
    document.title = "SpeedScore: Activity Feed";
}

/*************************************************************************
 * @function login
 * @desc 
 * When a user clicks the "Log In" button, this function uses the 
 * setTimeout() function to initiate a spinner animation for one second,
 * after which the loginFinish() function is called to perfrom the login.
 * @global loginBtn: The login form's submit button
 * @global loginBtnIcon: The login form's submit button icon.
 * @global loginFinish: Callback function that performs the login. 
 *************************************************************************/
function login(userId) {
    loginBtn.setAttribute("aria-busy","true");
    loginBtnIcon.classList.remove("fa-sign-in-alt");
    loginBtnIcon.classList.add("fa-spinner", "fa-spin");
    setTimeout(loginFinish,1000);
}

/*************************************************************************
 * @function Login Form SUBMIT Handler 
 * @Desc 
 * When the user clicks on the "Log In" button, we first check the
 * validity of the email and password fields, presenting accessible
 * error notifications if errors exist. If no errors exist, we
 * call the login() function, passing in the username of the user
 * @global loginForm: the <form> element whose 
 *         SUBMIT handler is triggered
 * @global emailField: The form's email field
 * @global passwordField: The form's password field
 * @global errBox: The <div> containing the error messages
 * @global emailErr: The error message for the email field
 * @global passwordErr: The error message for the password field
 *************************************************************************/
loginForm.addEventListener("submit",function(e) {
   e.preventDefault(); //Prevent default submti behavior
   //Is the email field valid?
   let emailValid = !emailField.validity.typeMismatch && 
                    !emailField.validity.valueMissing;
   //Is the password field valid?
   let passwordValid = !passwordField.validity.patternMismatch && 
                       !passwordField.validity.valueMissing;
   if (emailValid && passwordValid) { //All is well -- Exit
      login(emailField.value);
      return;
   }
   //If here, at least one field is invalid
   errBox.classList.remove("hidden");
   if (!emailValid) { //Email field is invalid
       document.title = "Error: Log in to SpeedScore";
       emailErr.classList.remove("hidden");
       emailErr.focus();
   } else {
       emailErr.classList.add("hidden");
   }
   if (!passwordValid) { //Password field is invalid
       passwordErr.classList.remove("hidden");
       if (emailValid) {
            document.title = "Error: Log in to SpeedScore";
            passwordErr.focus();
       }
   } else {
       passwordErr.classList.add("hidden");
   } 
});


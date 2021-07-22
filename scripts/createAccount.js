acctProfilePicField.addEventListener("change",function(e) {
    if (acctProfilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(acctProfilePicField.files[0]);
        reader.addEventListener("load",function() {
            acctProfilePicImage.setAttribute("src",this.result);
        });
    } else {
        acctProfilePicImage.setAttribute("src","images/GenericProfilePic.jpg");
    }
});

createAccountBtn.addEventListener("click",function(e) {
    loginPage.classList.add("hidden");
    createAccountDialog.classList.remove("hidden");
    document.title = "Create Account";
});

function resetCreateAccountForm() {
    acctEmailField.value = "";
    acctPasswordField.value = "";
    acctPasswordRepeatField.value = "";
    acctDisplayNameField.value = "";
    acctProfilePicField.value = "";
    acctProfilePicImage.setAttribute("src","images/GenericProfilePic.jpg");
    acctSecurityQuestionField.value = "";
    acctErrBox.classList.add("hidden");
    acctSecurityAnswerField.value = "";
    acctEmailErr.classList.add("hidden");
    acctPasswordErr.classList.add("hidden");
    acctPasswordRepeatErr.classList.add("hidden");
    acctDisplayNameErr.classList.add("hidden");
    acctSecurityQuestionErr.classList.add("hidden");
    acctSecurityAnswerErr.classList.add("hidden");
}

function createAccount(newAcct) {
    resetCreateAccountForm();
    alert("New account created: " + JSON.stringify(newAcct));
    document.title = "Log In to SpeedScore";
    createAccountDialog.classList.add("hidden");
    loginPage.classList.remove("hidden");
}

/*************************************************************************
 * @function createAccountForm SUBMIT Handler 
 * @Desc 
 * When the user clicks on the "Create Account" button, we first check the
 * validity of the fields, presenting accessible
 * error notifications if errors exist. If no errors exist, we
 * call the createAccount() function, passing in the account data
 * @global createAccountForm: the <form> element whose 
 *         SUBMIT handler is triggered
 * @global acctEmailField: Form's email field
 * @global acctPasswordField: Form's password field
 * @global acctPasswordRepeatField: Form's repeat pw field
 * @global acctDisplayNameField: Form's display name field
 * @global acctSecurityQuestionField: Form's security q field
 * @global acctSecurityAnswerField: Form's security answ field
 * @global acctErrBox: <div> containing the error messages
 * @global acctEmailErr: Error message for email field
 * @global acctPasswordErr: Error message for password field
 * @global acctRepeatPasswordErr: Error message for repeat pw field
 * @global acctDisplaynameErr: Error message for display name field
 * @global acctSecurityQuestionErr: Error message for security q field
 * @global acctSecurityAnswerErr: Error message for security answ field
 *************************************************************************/
 createAccountForm.addEventListener("submit",function(e) {
    e.preventDefault(); //Prevent default submit behavior
    //Is the email field valid?
    let emailValid = !acctEmailField.validity.typeMismatch && 
                     !acctEmailField.validity.valueMissing;
    //Is the password field valid?
    let passwordValid = !acctPasswordField.validity.patternMismatch && 
                        !acctPasswordField.validity.valueMissing;
    let repeatPasswordValid = (acctPasswordField.value === 
                               acctPasswordRepeatField.value);
    let displayNameValid = !acctDisplayNameField.validity.tooShort &&
                           !acctDisplayNameField.validity.valueMissing;
    let securityQuestionValid = !acctSecurityQuestionField.validity.tooShort &&
                                !acctSecurityQuestionField.validity.valueMissing;
    let securityAnswerValid = !acctSecurityAnswerField.validity.tooShort &&
                              !acctSecurityAnswerField.validity.valueMissing;
    if (emailValid && passwordValid && repeatPasswordValid &&
        displayNameValid && securityQuestionValid & securityAnswerValid) { 
        //All is well
       createAccount({email: acctEmailField.value, 
                      password: acctPasswordField.value,
                      displayName: acctDisplayNameField.value,
                      profilePic: acctProfilePicImage.getAttribute("src"),
                      securityQuestion: acctSecurityQuestionField.value,
                      securityAnswer: acctSecurityAnswerField.value
                    });
       return;
    }
    //If here, at least one field is invalid: Display the errors
    //and allow user to fix them.
    acctErrBox.classList.remove("hidden");
    document.title = "Error: Create Account";
    if (!securityAnswerValid) { //Display name field is invalid
        acctSecurityAnswerErr.classList.remove("hidden");
        acctSecurityAnswerErr.focus();
    } else {
        acctSecurityAnswerErr.classList.add("hidden");
    }
    if (!securityQuestionValid) { //Display name field is invalid
        acctSecurityQuestionErr.classList.remove("hidden");
        acctSecurityQuestionErr.focus();
    } else {
        acctSecurityQuestionErr.classList.add("hidden");
    } 
    if (!displayNameValid) { //Display name field is invalid
        acctDisplayNameErr.classList.remove("hidden");
        acctDisplayNameErr.focus();
    } else {
        acctDisplayNameErr.classList.add("hidden");
    } 
    if (!repeatPasswordValid) { //Password repeat field is invalid
        acctPasswordRepeatErr.classList.remove("hidden");
        acctPasswordRepeatErr.focus();
    } else {
        acctPasswordRepeatErr.classList.add("hidden");
    } 
    if (!passwordValid) { //Password field is invalid
        acctPasswordErr.classList.remove("hidden");
        acctPasswordErr.focus();
    } else {
        acctPasswordErr.classList.add("hidden");
    } 
    if (!emailValid) { //Email field is invalid
        acctEmailErr.classList.remove("hidden");
        acctEmailErr.focus();
    } else {
        acctEmailErr.classList.add("hidden");
    }
 });

 cancelCreateAccountBtn.addEventListener("click",function(e) {
    document.title = "Log In to SpeedScore";
    createAccountDialog.classList.add("hidden");
    loginPage.classList.remove("hidden");
});


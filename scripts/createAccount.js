 /*************************************************************************
 * File: createAccount.js
 * This file contains functions that support the "Create Account" Dialog.
 ************************************************************************/

 let firstFocusableCreateAccountItem = acctEmailField;

 /*************************************************************************
 * @function createAccountBtn CLICK Handler 
 * @Desc 
 * When the user clicks the "Create Account" button link on the "Log In"
 * page, transition to the "Create Account" dialog.
 * @global createAccountDialog: The "Create Account" dialog
 * @global loginPage: The Log In page
 *************************************************************************/
createAccountBtn.addEventListener("click",function(e) {
    resetLoginForm();
    loginPage.classList.add("hidden");
    createAccountDialog.classList.remove("hidden");
    document.title = "Create Account";
    acctEmailField.focus();
});

/*************************************************************************
 * @function acctProfilePicField CHANGE Handler 
 * @Desc 
 * When the user finishes interacting with the File picker dialog box,
 * update the user's profile picture based on the selection from the
 * file picker. If the user cancels out of the File Picker, the input
 * element's value will be empty and we set the profile picture to the
 * default picture.
 * @global acctProfilePicField: The "Create Account" form field 
 *         containing the optional profile picture
 * @global acctProfilePicImage: The "Create Account" <img> element that
 *         displays the user's profile picture (possibly the default)
 *************************************************************************/
acctProfilePicField.addEventListener("change",function(e) {
    if (acctProfilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(acctProfilePicField.files[0]);
        reader.addEventListener("load",function() {
            acctProfilePicImage.setAttribute("src",this.result);
        });
    } else {
        acctProfilePicImage.setAttribute("src",defaultProfilePic);
    }
});

/*************************************************************************
 * @function resetCreateAccountForm 
 * @Desc 
 * When the user exits the "Create Account" Dialog, reset the form to
 * show blank data in case the form is visited again.
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
function resetCreateAccountForm() {
    acctEmailField.value = "";
    acctPasswordField.value = "";
    acctPasswordRepeatField.value = "";
    acctDisplayNameField.value = "";
    acctProfilePicField.value = "";
    acctProfilePicImage.setAttribute("src",defaultProfilePic);
    acctSecurityQuestionField.value = "";
    acctErrBox.classList.add("hidden");
    acctSecurityAnswerField.value = "";
    acctEmailErr.classList.add("hidden");
    acctPasswordErr.classList.add("hidden");
    acctPasswordRepeatErr.classList.add("hidden");
    acctDisplayNameErr.classList.add("hidden");
    acctSecurityQuestionErr.classList.add("hidden");
    acctSecurityAnswerErr.classList.add("hidden");
    firstFocusableCreateAccountItem = acctEmailField;
}

/*************************************************************************
 * @function accountCreatedClose CLICK Handler 
 * @Desc 
 * When the user clicks on the close button of the "Account Created"
 * toast notification on the "Log In" page, close it.
 * @global accountCreated: The "Account Created" toast
 *************************************************************************/
accountCreatedClose.addEventListener("click",function() {
    accountCreated.classList.add("hidden");
});

/*************************************************************************
 * @function createAccount 
 * @desc 
 * Given a JavaScript object containing a new account, save the
 * account to localStorage, return the user to the "Log In" page, 
 * and display a toast message
 * indicating that a new account was created.
 * For now, we display the account data in an alert box. Eventually,
 * we will store the data to localStorage.
 * @global loginPage: The "Log In" page
 * @global createAccountDialog: The "Create Account" dialog
 * @global accountCreatedEmail: The field in the toast notification where
 *         we display the email of the new account.
 * @global: accountCreated: The toast notification on the "Log In" page
  *************************************************************************/
function createAccount() {
    //Build account object from form data
    const newAcct = {
        accountInfo: {
            email: acctEmailField.value, 
            password: acctPasswordField.value,
            securityQuestion: acctSecurityQuestionField.value,
            securityAnswer: acctSecurityAnswerField.value
        },
        identityInfo: {
            displayName: acctDisplayNameField.value,
            profilePic: acctProfilePicImage.getAttribute("src"),
        },
        speedgolfInfo: {
            bio: "",
            firstRound: "",
            personalBest: {strokes: "",minutes: "", seconds: "", course: ""},
            clubs: {}
        }
    };
    //Save account to localStorage as key-value pair
    localStorage.setItem(newAcct.accountInfo.email, 
        JSON.stringify(newAcct));
    //Reset form in case it is visited again
    resetCreateAccountForm();
    //Transition to "Log In" page
    document.title = "Log In to SpeedScore";
    createAccountDialog.classList.add("hidden");
    loginPage.classList.remove("hidden");
    accountCreatedEmail.textContent = newAcct.email;
    accountCreated.classList.remove("hidden");
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
        //All is well -- Call createAccount()
        createAccount();
       return;
    }
    //If here, at least one field is invalid: Display the errors
    //and allow user to fix them.
    acctErrBox.classList.remove("hidden");
    document.title = "Error: Create Account";
    if (!securityAnswerValid) { //Display name field is invalid
        acctSecurityAnswerErr.classList.remove("hidden");
        acctSecurityAnswerErr.focus();
        firstFocusableCreateAccountItem = acctSecurityAnswerErr;
    } else {
        acctSecurityAnswerErr.classList.add("hidden");
    }
    if (!securityQuestionValid) { //Display name field is invalid
        acctSecurityQuestionErr.classList.remove("hidden");
        acctSecurityQuestionErr.focus();
        firstFocusableCreateAccountItem = acctSecurityQuestionErr;
    } else {
        acctSecurityQuestionErr.classList.add("hidden");
    } 
    if (!displayNameValid) { //Display name field is invalid
        acctDisplayNameErr.classList.remove("hidden");
        acctDisplayNameErr.focus();
        firstFocusableCreateAccountItem = acctDisplayName;
    } else {
        acctDisplayNameErr.classList.add("hidden");
    } 
    if (!repeatPasswordValid) { //Password repeat field is invalid
        acctPasswordRepeatErr.classList.remove("hidden");
        acctPasswordRepeatErr.focus();
        firstFocusableCreateAccountItem = acctPasswordRepeatErr;
    } else {
        acctPasswordRepeatErr.classList.add("hidden");
    } 
    if (!passwordValid) { //Password field is invalid
        acctPasswordErr.classList.remove("hidden");
        acctPasswordErr.focus();
        firstFocusableCreateAccountItem = acctPasswordErr;
    } else {
        acctPasswordErr.classList.add("hidden");
    } 
    if (!emailValid) { //Email field is invalid
        acctEmailErr.classList.remove("hidden");
        acctEmailErr.focus();
        firstFocusableCreateAccountItem = acctEmailErr;
    } else {
        acctEmailErr.classList.add("hidden");
    }
 });

 /*************************************************************************
 * @function cancelCreateAccountBtn CLICK Handler 
 * @Desc 
 * When the user clicks the "Cancel" button to exit "Create Account" Dialog, 
 * reset the form and transition to the Log In page.
 * @global createAccountDialog: The "Create Account" dialog
 * @global loginPage: The Log In page
 *************************************************************************/
 cancelCreateAccountBtn.addEventListener("click",function(e) {
    resetCreateAccountForm();
    document.title = "Log In to SpeedScore";
    createAccountDialog.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

/*************************************************************************
 * @function keyDownCreateDialogFocused 
 * @desc 
 * When the user presses a key with an element in the Create Account 
 * dialog focused, we implement the accessible keyboard interface for
 * a modal dialog box. This means that "Escape" dismisses the dialog and
 * that it is impossible to tab outside of the dialog box.
 * @global createAccountDialog: The "Create Account" dialog
 * @global loginPage: The Log In page
 * @global firstFocusableCreateAccountItem: References the first focusable
 *         item in "Create Account" dialog. 
 * @global cancelCreateAccountBtn: The "Cancel" button (last focusable 
 *         item in "Create Account" dialog)
 *************************************************************************/
function keyDownCreateDialogFocused(e) {
    if (e.code === "Escape") {
        cancelCreateAccountBtn.click();
        return;
    }
    if (e.code === "Tab" && document.activeElement == firstFocusableCreateAccountItem &&
       e.shiftKey) {
        //shift focus to last focusable item in dialog
        cancelCreateAccountBtn.focus();
        e.preventDefault();
        return;
    }
    if (e.code === "Tab" && document.activeElement == cancelCreateAccountBtn &&
        !e.shiftKey) {
        //shift focus to first focusable item in dialog
        firstFocusableCreateAccountItem.focus();
        e.preventDefault()
        return;
    }
}
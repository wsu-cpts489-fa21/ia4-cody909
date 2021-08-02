/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/

 let firstFocusableUpdateProfileItem = profileEmailField;

/*************************************************************************
 * @function resetupdateProfileForm 
 * @Desc 
 * When the user exits the "Create Account" Dialog, reset the form to
 * show blank acctEmailField: Form's email field
 * @global data in case the form is visited again.
 * @global profilePasswordField: Form's password field
 * @global profileDisplayNameField: Form's display name field
 * @global profileSecurityQuestionField: Form's security q field
 * @global profileSecurityAnswerField: Form's security answ field
 * @global profileErrBox: <div> containing the error messages
 * @global profileEmailErr: Error message for email field
 * @global profilePasswordErr: Error message for password field
 * @global profileDisplaynameErr: Error message for display name field
 * @global profileSecurityQuestionErr: Error message for security q field
 * @global profileSecurityAnswerErr: Error message for security answ field
 *************************************************************************/
 function resetUpdateProfileForm() {
    profileEmailField.value = "";
    profilePasswordField.value = "";
    profileDisplayNameField.value = "";
    profilePicField.value = "";
    profilePicImage.setAttribute("src",defaultProfilePic);
    profileSecurityQuestionField.value = "";
    profileErrBox.classList.add("hidden");
    profileSecurityAnswerField.value = "";
    profileEmailErr.classList.add("hidden");
    profileDisplayNameErr.classList.add("hidden");
    profileSecurityQuestionErr.classList.add("hidden");
    profileSecurityAnswerErr.classList.add("hidden");
    firstFocusableUpdateProfileItem = profileEmailField;
}

/*************************************************************************
 * @function populateProfileSettingsForm 
 * @Desc 
 * Populates the "Account and Profile Settings" dialog form with the 
 * current user's data. 
 * The following global vars are used to access fields in the form
 *  @global profileEmailField
 *  @global profilePasswordField
 *  @global profileSecurityQuestionField
 *  @global profileSecurityAnswerField
 *  @global profileDisplayNameField
 *  @global profilePicImage
 *  @global profileBioField    
 *  @global profileBestStrokesField
 *  @global profileBestMinutesField
 *  @global profileBestSecondsField
 *  @global profileBestCourseField
 *************************************************************************/
function populateProfileSettingsForm() {
    profileEmailField.value = userData.accountInfo.email;
    profilePasswordField.value = userData.accountInfo.password;
    profileSecurityQuestionField.value = userData.accountInfo.securityQuestion;
    profileSecurityAnswerField.value = userData.accountInfo.securityAnswer;
    profileDisplayNameField.value = userData.identityInfo.displayName;
    profilePicImage.setAttribute("src",userData.identityInfo.profilePic);
    profileBioField.value = userData.speedgolfInfo.bio;
    profileFirstRoundField.value = userData.speedgolfInfo.firstRound;
    profileBestStrokesField.value = userData.speedgolfInfo.personalBest.strokes;
    profileBestMinutesField.value = userData.speedgolfInfo.personalBest.minutes;
    profileBestSecondsField.value = userData.speedgolfInfo.personalBest.seconds;
    profileBestCourseField.value = userData.speedgolfInfo.personalBest.course;
    for (const prop in userData.speedgolfInfo.clubs) {
        document.getElementById("sg" + prop).checked = true;
    }
}

/*************************************************************************
 * @function profileBtn CLICK Handler 
 * @Desc 
 * When the user clicks their profile picture, hide the menu button, tabs,
 * and current tab panel, and show the "Account and Profile Settings" Dialog
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 * @global profileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 profileBtn.addEventListener("click", function(e) {
    transitionToDialog();
    document.title = "Edit Account and Profile";
    populateProfileSettingsForm();
    profileSettingsDialog.classList.remove("hidden");
    profileEmailField.focus();
});

/*************************************************************************
 * @function submit button CLICK Handler 
 * @Desc 
 * When the user clicks the form's "Update" (submit) button, we need to
 * validate the form data. If it's valid, we update the current user's
 * object in localStorage.
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 * @global profileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
function updateProfile() {
    let clubsInBag = {};
    for (let i = 0; i < clubsInBagChecks.length; ++i) {
        if (clubsInBagChecks[i].checked) {
            clubsInBag[clubsInBagchecks[i].name] = true;
        }
    }
    const updatedProfile = {
        accountInfo: {
            email: profileEmailField.value, 
            password: profilePasswordField.value,
            securityQuestion: profileSecurityQuestionField.value,
            securityAnswer: profileSecurityAnswerField.value
        },
        identityInfo: {
            displayName: profileDisplayNameField.value,
            profilePic: profilePicImageField.getAttribute("src"),
        },
        speedgolfInfo: {
            bio: profileBioField.value,
            firstRound: profileFirstRoundField.value,
            personalBest: {
                strokes: profileBestStrokesField.value,
                minutes: profileBestMinutesField.value, 
                seconds: profileBestSecondsField.value, 
                course: profileBestCourseField},
            clubs: clubsInBag
        }
    };
    //Save updated profile to localStorage as key-value pair
    localStorage.setItem(updatedProfile.accountInfo.email, 
        JSON.stringify(updatedProfile));
    //Reset form in case it is visited again
    resetUpdateProfileForm();
    //Transition back to previous mode page
    transitionFromDialog();
    document.title = "SpeedScore: " + modeNames[currentMode];
    createAccountDialog.classList.add("hidden");
    profileSettingsDialog.classList.add("hidden");
}

/*************************************************************************
 * @function submit button CLICK Handler 
 * @Desc 
 * When the user clicks the form's "Update" (submit) button, we need to
 * validate the form data. If it's valid, we update the current user's
 * object in localStorage.
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 * @global profileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 editProfileForm.addEventListener("submit",function() {
    e.preventDefault(); //Prevent default submit behavior
    //Is the email field valid?
    let emailValid = !profileEmailField.validity.typeMismatch && 
                     !profileEmailField.validity.valueMissing;
    //Is display field valid?
    let displayNameValid = !profileDisplayNameField.validity.tooShort &&
                           !profileDisplayNameField.validity.valueMissing;
    //Is security question field valid?
    let securityQuestionValid = !profileSecurityQuestionField.validity.tooShort &&
                                !profileSecurityQuestionField.validity.valueMissing;
    //Is security answer field valid?
    let securityAnswerValid = !profileSecurityAnswerField.validity.tooShort &&
                              !profileSecurityAnswerField.validity.valueMissing;
    if (emailValid && displayNameValid && 
        securityQuestionValid & securityAnswerValid) { 
        //All is well -- Call updateAccount()
        updateProfile();
       return;
    }
    //If here, at least one field is invalid: Display the errors
    //and allow user to fix them.
    profileErrBox.classList.remove("hidden");
    document.title = "Error: Update Account & Profile";
    if (!securityAnswerValid) { //Display name field is invalid
        profileSecurityAnswerErr.classList.remove("hidden");
        profileSecurityAnswerErr.focus();
        firstFocusableUpdateProfileItem = profileSecurityAnswerErr;
    } else {
        profileSecurityAnswerErr.classList.add("hidden");
    }
    if (!securityQuestionValid) { //Display name field is invalid
        profileSecurityQuestionErr.classList.remove("hidden");
        profileSecurityQuestionErr.focus();
        firstFocusableUpdateProfileItem = profileSecurityQuestionErr;
    } else {
        profileSecurityQuestionErr.classList.add("hidden");
    } 
    if (!displayNameValid) { //Display name field is invalid
        profileDisplayNameErr.classList.remove("hidden");
        profileDisplayNameErr.focus();
        firstFocusableUpdateProfileItem = profileDisplayName;
    } else {
        profileDisplayNameErr.classList.add("hidden");
    } 
    if (!emailValid) { //Email field is invalid
        profileEmailErr.classList.remove("hidden");
        profileEmailErr.focus();
        firstFocusableCreateAccountItem = profileEmailErr;
    } else {
        profileEmailErr.classList.add("hidden");
    }
 });
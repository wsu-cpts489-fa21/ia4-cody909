/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/

 let firstFocusableUpdateProfileItem = profileEmailField;

 /*************************************************************************
 * @function profilePicField CHANGE Handler 
 * @Desc 
 * When the user finishes interacting with the File picker dialog box,
 * update the user's profile picture based on the selection from the
 * file picker. If the user cancels out of the File Picker, the input
 * element's value will be empty and we set the profile picture to the
 * default picture.
 * @global profilePicField: The "Update Profile" form field 
 *         containing the optional profile picture
 * @global profilePicImage: The "Update Profile" <img> element that
 *         displays the user's profile picture (possibly the default)
 *************************************************************************/
profilePicField.addEventListener("change",function(e) {
    if (profilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(profilePicField.files[0]);
        reader.addEventListener("load",function() {
            profilePicImage.setAttribute("src",this.result);
        });
    } else {
        profilePicImage.setAttribute("src",defaultProfilePic);
    }
});

/*************************************************************************
 * @function resetupdateProfileForm 
 * @Desc 
 * When the user exits the "Update Profile" Dialog, reset the form to
 * blank in case the form is visited again.
 * @global profileEmailFiled: Form's email field
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
    //Hide errors
    profileErrBox.classList.add("hidden");
    profileEmailErr.classList.add("hidden");
    profileDisplayNameErr.classList.add("hidden");
    profileSecurityQuestionErr.classList.add("hidden");
    profileSecurityAnswerErr.classList.add("hidden");
    //Blank out account info
    profileEmailField.value = "";
    profilePasswordField.value = "";
    profileSecurityQuestionField.value = "";
    profileSecurityAnswerField.value = "";
    //Blank out Identity info
    profileDisplayNameField.value = "";
    profilePicField.value = "";
    profilePicImage.setAttribute("src",defaultProfilePic);
    //Blank out Speedgolf info
    profileBioField.value = "";
    profileFirstRoundField.value = "";
    profileHomeCourseField.value = "";
    profileBestStrokesField.value = "";
    profileBestMinutesField.value = "";
    profileBestSecondsField.value = "";
    profileBestCourseField.value = "";
    for (let i = 0; i < allClubs.length; ++i) {
        document.getElementById("sg"+ allClubs[i]).checked = false;
    }
    profileClubCommentsField.value = "";
    //Set first focusable item.
    firstFocusableUpdateProfileItem = profileEmailField;
    //Expand only the first accordion panel
    accountSettingsBtn.classList.remove("collapsed");
    accountSettingsPanel.classList.add("show");
    profileSettingsBtn.classList.add("collapsed");
    profileSettingsPanel.classList.remove("show");
    sgSettingsBtn.classList.add("collapsed");
    sgSettingsPanel.classList.remove("show");
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
    profileHomeCourseField.value = userData.speedgolfInfo.homeCourse;
    profileFirstRoundField.value = userData.speedgolfInfo.firstRound;
    profileBestStrokesField.value = userData.speedgolfInfo.personalBest.strokes;
    profileBestMinutesField.value = userData.speedgolfInfo.personalBest.minutes;
    profileBestSecondsField.value = userData.speedgolfInfo.personalBest.seconds;
    profileBestCourseField.value = userData.speedgolfInfo.personalBest.course;   
    //Populate checks...
    for (const prop in userData.speedgolfInfo.clubs) {
        document.getElementById("sg" + prop).checked = true;
    }
    profileClubCommentsField.value = userData.speedgolfInfo.clubComments;
    profileEmailField.focus(); //Set focus to first field.
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
    transitionToDialog(profileSettingsDialog, "Edit Account and Profile");
    populateProfileSettingsForm();
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
    for (let i = 0; i < profileClubsInBagChecks.length; ++i) {
        if (profileClubsInBagChecks[i].checked) {
            clubsInBag[profileClubsInBagChecks[i].name] = true;
        }
    }
    oldUserEmail = userData.accountInfo.email;
    userData = {
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
            homeCourse: profileHomeCourseField.value,
            personalBest: {
                strokes: profileBestStrokesField.value,
                minutes: profileBestMinutesField.value, 
                seconds: profileBestSecondsField.value, 
                course: profileBestCourseField.value},
            clubs: clubsInBag,
            clubComments: profileClubCommentsField.value
        }
    };
    //Save updated profile to localStorage as key-value pair
    localStorage.setItem(userData.accountInfo.email, 
        JSON.stringify(userData));
    if (oldUserEmail !== userData.accountInfo.email) {
        //We need to remove old user record from localStorage
        localStorage.removeItem(oldUserEmail);
    }
    //Reset form in case it is visited again
    resetUpdateProfileForm();
    //Transition back to previous mode page
    profileBtn.style.backgroundImage = "url(" + userData.identityInfo.profilePic + ")";	
    transitionFromDialog(profileSettingsDialog);
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
editProfileForm.addEventListener("submit",function(e) {
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
    if (!emailValid || !securityQuestionValid || !securityAnswerValid) {
        //expand account panel
        accountSettingsBtn.classList.remove("collapsed");
        accountSettingsPanel.classList.add("show");
    } else {
        //collapse account panel
        accountSettingsBtn.classList.add("collapsed");
        accountSettingsPanel.classList.remove("show");
    }
    if (!displayNameValid) {
        //expand profile panel
        profileSettingsBtn.classList.remove("collapsed");
        profileSettingsPanel.classList.add("show");
    } else {
        //collapse account panel
        profileSettingsBtn.classList.add("collapsed");
        profileSettingsPanel.classList.remove("show");
    }
    //Speedgolf Settings Panel always collapsed
    sgSettingsBtn.classList.add("collapsed");
    sgSettingsPanel.classList.remove("show");
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
        firstFocusableUpdateProfileItem = profileEmailErr;
    } else {
        profileEmailErr.classList.add("hidden");
    }
 });

 cancelUpdateProfileBtn.addEventListener("click", function() {
    resetUpdateProfileForm();
    transitionFromDialog(profileSettingsDialog); 
 });

 /*************************************************************************
 * @function keyDownUpdateDialogFocused 
 * @desc 
 * When the user presses a key with an element in the "Account & Profile" 
 * dialog focused, we implement the accessible keyboard interface for
 * a modal dialog box. This means that "Escape" dismisses the dialog and
 * that it is impossible to tab outside of the dialog box.
 * @global profileSettingsDialog: The "Account & Profile" dialog
 * @global firstUpdateProfileItem: References the first focusable
 *         item in "Account & Profile" dialog. 
 * @global cancelUpdateProfiletBtn: The "Cancel" button (last focusable 
 *         item in "Account & Profile" dialog)
 *************************************************************************/
function keyDownUpdateDialogFocused(e) {
    if (e.code === "Escape") {
        cancelUpdateProfileBtn.click();
        return;
    }
    if (e.code === "Tab" && document.activeElement == firstFocusableUpdateProfileItem &&
       e.shiftKey) {
        //shift focus to last focusable item in dialog
        cancelUpdateProfileBtn.focus();
        e.preventDefault();
        return;
    }
    if (e.code === "Tab" && document.activeElement == cancelUpdateProfileBtn &&
        !e.shiftKey) {
        //shift focus to first focusable item in dialog
        firstFocusableUpdateProfileItem.focus();
        e.preventDefault()
        return;
    }
}
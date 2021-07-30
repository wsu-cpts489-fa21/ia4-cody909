/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/
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
    prepareForDialog();
    document.title = "Edit Account and Profile";
    populateProfileSettingsForm();
    profileSettingsDialog.classList.remove("hidden");
    profileEmailField.focus();
});
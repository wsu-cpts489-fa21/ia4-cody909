/*************************************************************************
 * File: main.js
 * Definitions of global variables to maintain app state and provide
 * convenient access to DOM elements. Also included are
 * general-purpose functions that are not associated with any particular
 * area of the app.
 ************************************************************************/
//Global variable containing data object of user currently logged in
//object has these fields: email, password, displayName, profilePic,
//securityQuestion, securityAnswer
let userData = {}; //set upon login

//Global variable that stores the index of a round (in the userData object)
//to be edited or deleted
let roundIndex; 

//Global variables to help manage the menu */
let focusedMenuItem = 0; //Array index of the menu item with focus
//Array of the HTML elements that are menu items
const menuItems = document.querySelectorAll("li[role='menuitem']");

//Global variables to help manage the mode tabs
let currentMode = 0; //The index of app's current mode
let focusedMode = 0; //The index of the mode button with focus
//Array of mode tab button elements:
const modeTabButtons = 
  document.querySelectorAll("button[role='tab']");
//Array of mode tab panel elements:
const modeTabPanels = 
  document.querySelectorAll("div[role='tabpanel']");
//Array mapping current mode to its name, so that
//we can set document.title appropriately
modeNames=["Activity Feed", "Rounds","Courses","Buddies"];

//Global variables to help manage the floating
//action butons and their corresponding dialog boxes
//Array of mode action buttons
const modeActionButtons = 
document.querySelectorAll("button.float-btn");
//array of mode action dialog boxes
const modeActionDialogs =
document.querySelectorAll("div.action-dialog");
//array of "OK" buttons within the dialog boxes
const dialogActionButtons =
document.querySelectorAll("button.action-button");
//array of "Cancel" buttons within the dialog boxes
const dialogCancelButtons =
document.querySelectorAll("button.cancel-button");
//array of app titles to display when mode dialogs are active
const dialogTitles = ["SpeedScore: Post to Feed","SpeedScore: Log Round",
  "SpeedScore: Add Course","SpeedScore: Find Buddies"];
//Global variables to provide easy access to top-level UI elements
const menuBtn =  document.getElementById("menuBtn"); 
const sideMenu = document.getElementById("sideMenu");
const searchBtn = document.getElementById("searchBtn");
const profileBtn = document.getElementById("profileBtn");
const skipLink = document.getElementById("sLink");
const modeTabsContainer = document.getElementById("modeTabs");

//Global variables to provide easy access elements in login page and form
const loginPage = document.getElementById("loginPage");
const loginForm = document.getElementById("loginForm");
const errBox = document.getElementById("errorBox");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const emailErr = document.getElementById("emailError");
const passwordErr = document.getElementById("passwordError");
const authErr = document.getElementById("authError");
const loginBtnIcon = document.getElementById("loginBtnIcon");
const loginBtn = document.getElementById("loginBtn");
const createAccountBtn = document.getElementById("createAccountBtn");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");
const accountCreated = document.getElementById("accountCreated");
const accountCreatedClose = document.getElementById("accountCreatedClose");
const accountCreatedEmail = document.getElementById("accountCreatedEmail")

//Global variables to provide easy access to Create Account Dialog elements
const createAccountDialog = document.getElementById("createAccountDialog");
const submitCreateAccountBtn = document.getElementById("submitCreateAccountBtn");
const cancelCreateAccountBtn = document.getElementById("cancelCreateAccountBtn");
const acctErrBox = document.getElementById("acctErrorBox");
const acctEmailField = document.getElementById("acctEmail");
const acctPasswordField = document.getElementById("acctPassword");
const acctPasswordRepeatField = document.getElementById("acctPasswordRepeat");
const acctDisplayNameField = document.getElementById("acctDisplayName");
const acctProfilePicField = document.getElementById("acctProfilePic");
const acctProfilePicImage = document.getElementById("acctProfilePicImage");
const acctSecurityQuestionField = document.getElementById("acctSecurityQuestion");
const acctSecurityAnswerField = document.getElementById("acctSecurityAnswer");
const acctEmailErr = document.getElementById("acctEmailError");
const acctPasswordErr = document.getElementById("acctPasswordError");
const acctPasswordRepeatErr = document.getElementById("acctPasswordRepeatError");
const acctDisplayNameErr = document.getElementById("acctDisplayNameError");
const acctSecurityQuestionErr = document.getElementById("acctSecurityQuestionError");
const acctSecurityAnswerErr = document.getElementById("acctSecurityAnswerError");

//Global variables to provide easy access to Edit Profile Dialog elements
const profileSettingsDialog = document.getElementById("profileSettingsDialog");
const accountSettingsBtn = document.getElementById("accountSettingsBtn");
const accountSettingsPanel = document.getElementById("accountSettingsPanel");
const profileSettignsBtn = document.getElementById("profileSettingsBtn");
const profileSettingsPanel = document.getElementById("profileSettingsPanel");
const sgSettingsBtn = document.getElementById("sgSettingsBtn");
const sgSettingsPanel = document.getElementById("sgSettingsPanel");
const editProfileForm = document.getElementById("editProfileForm");
const profileErrBox = document.getElementById("profileErrorBox");
const profileEmailErr = document.getElementById("profileEmailError");
const profileDisplayNameErr = document.getElementById("profileDisplayNameError");
const profileSecurityQuestionErr = document.getElementById("profileSecurityQuestionError");
const profileSecurityAnswerErr = document.getElementById("profileSecurityAnswerError");
const profileEmailField = document.getElementById("profileEmail");
const profilePasswordField = document.getElementById("profilePassword");
const profileSecurityQuestionField = document.getElementById("profileSecurityQuestion");
const profileSecurityAnswerField = document.getElementById("profileSecurityAnswer");
const profileDisplayNameField = document.getElementById("profileDisplayName");
const profilePicField = document.getElementById("profilePic");
const profilePicImageField = document.getElementById("profilePicImage");
const profileBioField = document.getElementById("sgBio");
const profileFirstRoundField = document.getElementById("sgFirstRound");
const profileHomeCourseField = document.getElementById("sgHomeCourse");
const profileBestStrokesField = document.getElementById("sgBestStrokes");
const profileBestMinutesField = document.getElementById("sgBestMinutes");
const profileBestSecondsField = document.getElementById("sgBestSeconds");
const profileBestCourseField = document.getElementById("sgBestCourse");
const allClubs = ["Driver","3W","4W","5W","Hybrid","1I","2I","3I","4I","5I","6I","7I","8I","9I","PW","GW","SW","LW","Putter"];
const profileClubsInBagChecks = document.getElementById("clubsDiv").querySelectorAll("input");
const profileClubCommentsField = document.getElementById("sgClubComments");
const cancelUpdateProfileBtn = document.getElementById("cancelUpdateProfileBtn");

//Global variables to provide easy access to Log Round Dialog elements
const roundsModeDialog = document.getElementById("roundsModeDialog");
const roundFormHeader = document.getElementById("roundFormHeader");
const roundFormSubmitBtn = document.getElementById("roundFormSubmitBtn");
const roundFormSubmitBtnLabel = document.getElementById("roundFormSubmitBtnLabel");
const roundFormSubmitBtnIcon = document.getElementById("roundFormSubmitBtnIcon");
const logRoundForm = document.getElementById("logRoundForm");
const roundErrBox = document.getElementById("roundErrorBox");
const roundDateErr = document.getElementById("roundDateError");
const roundCourseErr = document.getElementById("roundCourseError");
const roundStrokesErr = document.getElementById("roundStrokesError");
const roundMinutesErr = document.getElementById("roundMinutesError");
const roundSecondsErr = document.getElementById("roundSecondsError");
const roundNotesErr = document.getElementById("roundNotesError");
const roundDate = document.getElementById("roundDate");
const roundCourse = document.getElementById("roundCourse");
const roundType = document.getElementById("roundType");
const roundHoles = document.getElementById("roundHoles");
const roundStrokes = document.getElementById("roundStrokes");
const roundMinutes = document.getElementById("roundMinutes");
const roundSeconds = document.getElementById("roundSeconds");
const roundSGS = document.getElementById("roundSGS");

//Global variables to provide easy access to "Rounds" mode toast
const roundUpdatedClose = document.getElementById("roundUpdatedClose");
const roundUpdated = document.getElementById("roundUpdated");
const roundUpdatedMsg = document.getElementById("roundUpdatedMsg");

//Global variables to provide easy access to "Rounds" mode table
roundsTable = document.getElementById("roundsTable");

//Default profile picture
defaultProfilePic = "../images/DefaultProfilePic.jpg";

/*************************************************************************
 * @function transitionToDialog
 * @desc 
 * This function prepares the UI prior to opening a dialog box. It hides
 * the skip link, banner bar buttons, mode tabs, and current tab panel,
 * so that they are unavailable while the user interacts with the dialog.
 * It then displays the dialog box and dialog box title.
 * Note: This function is placed in main.js because it is useful to 
 * multiple UI components.
 * @param dialogTitle: The title of the dialog to which to set 
 * document.title
 * @param dialog: A reference to the HTML element containing the dialog;
 * it will be shown by removing the "hidden" class 
 * @global skipLink: The skip link
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 *************************************************************************/
 function transitionToDialog(dialog, dialogTitle, dialogPrepFunc) {
  skipLink.classList.add("hidden"); 
  menuBtn.classList.add("hidden");
  searchBtn.classList.add("hidden");
  profileBtn.classList.add("hidden");
  modeTabsContainer.classList.add("hidden");
  modeTabPanels[currentMode].classList.add("hidden");
  document.title = dialogTitle;
  dialogPrepFunc();
  dialog.classList.remove("hidden");
}

/*************************************************************************
 * @function transitionFromDialog
 * @param dialogToClose -- a reference to the HML dialog element to close
 * @desc 
 * This function restores the UI after closing a dialog box. It shows
 * the skip link, banner bar buttons, mode tabs, and current tab panel,
 * Note: This function is placed in main.js because it is useful to 
 * multiple UI components.
 * @global skipLink: The skip link
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 *************************************************************************/
 function transitionFromDialog(dialogToClose) {
  //Hide dialog
  dialogToClose.classList.add("hidden");
  //Show app banner and mode tabs
  skipLink.classList.remove("hidden"); 
  menuBtn.classList.remove("hidden");
  searchBtn.classList.remove("hidden");
  profileBtn.classList.remove("hidden");
  modeTabsContainer.classList.remove("hidden");
  //Show current mode panel
  modeTabPanels[currentMode].classList.remove("hidden");
  //Reset app title
  document.title = "SpeedScore: " + modeNames[currentMode];
  //Set focus to action button in current mode
  modeActionButtons[currentMode].focus();
}
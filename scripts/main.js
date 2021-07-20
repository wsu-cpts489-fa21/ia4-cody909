/*************************************************************************
 * File: main.js
 * Definitions of global variables to maintain app state and provide
 * convenient access to frequently used DOM elements. Also included are
 * general-purpose functions that are not associated with any particular
 * area of the app.
 ************************************************************************/

/* The following variables help us manage the menu */

let focusedMenuItem = 0; //Array index of the menu item with focus
//Array of the HTML elements that are menu items
const menuItems = document.querySelectorAll("li[role='menuitem']");
//Reference to the menuBtn element, which is frequently accessed.
const menuBtn =  document.getElementById("menuBtn"); 

/* The following variables help us manage the mode tabs */

let currentMode = 0; //The index of app's current mode
let focusedMode = 0; //The index of the mode button with focus
//Array of mode tab button elements:
const modeTabButtons = 
  document.querySelectorAll("button[role='tab']");
//Array of mode tab panel elements:
const modeTabPanels = 
  document.querySelectorAll("div[role='tabpanel']");

/* The following variables help us manage the floating
   action butons and their corresponding dialog boxes
*/
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

//Global variables to provide easy access to UI elements 
const searchBtn = document.getElementById("searchBtn");
const profileBtn = document.getElementById("profileBtn");
const skipLink = document.getElementById("sLink");
const modeTabsContainer = document.getElementById("modeTabs");

//Global variables to provide easy access elements in login page and form
const loginPage = document.getElementById("loginPage");
const loginForm = document.getElementById("loginForm");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const errBox = document.getElementById("errorBox");
const emailErr = document.getElementById("emailError");
const passwordErr = document.getElementById("passwordError");


/*************************************************************************
 * File: sideMenu.js
 * Definitions of global variables to maintain app state and provide
 * convenient access to frequently used DOM elements. 
 ************************************************************************/

/* The following variables help us maintain the menu */
let focusedMenuItem = 0; //Array index of the menu item with focus
//Array of the HTML elements that are menu items
const menuItems = document.querySelectorAll("li[role='menuitem']");
//Reference to the menuBtn element, which is frequently accessed.
const menuBtn =  document.getElementById("menuBtn"); 

/* The following variables help us maintain the mode tabs */
let currentMode = 0; //The index of app's current mode
let focusedMode = 0; //The index of the mode button with focus
//Array of mode tab button elements:
const modeTabButtons = 
  document.querySelectorAll("button[role='tab']");
//Array of mode tab panel elements:
const modeTabPanels = 
  document.querySelectorAll("div[role='tabpanel']");
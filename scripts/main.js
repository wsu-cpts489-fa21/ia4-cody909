/*************************************************************************
 * File: sideMenu.js
 * Definitions of global variables to maintain app state and provide
 * convenient access to frequently used DOM elements. 
 ************************************************************************/

//Array of the HTML elements that are menu items
const   menuItems = document.querySelectorAll("li[role='menuitem']");

//State and convenience variables for side menu
let focusedMenuItem = 0; //The array index of the menu item with focus

//Reference to the menuBtn element, which is frequently accessed.
const menuBtn =  document.getElementById("menuBtn"); 

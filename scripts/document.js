/*************************************************************************
 * File: document.js
 * These functions support interaction with the top-level document
 * element.
 ************************************************************************/

/*************************************************************************
 * @function Document Keydown Event Handler 
 * @desc 
 * When the user presses a key in the app, we interpret the
 * keypress based on which user interface element currently has focus. 
 *************************************************************************/
 document.addEventListener("keydown", function(e) { 
    if (document.activeElement.id === "menuBtn") {
        keyDownMenuBtnFocused(e.code); 
    } else if (document.activeElement.getAttribute("role") 
               === "menuitem") {
        keyDownMenuItemFocused(e.code);
    }
 });
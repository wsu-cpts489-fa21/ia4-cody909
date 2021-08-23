/*************************************************************************
 * File: modeActions.js
 * This file contains functions that support the 
 * apps' floating action buttons and action dialog buttons associated
 * with each app mode.
*************************************************************************/

/*************************************************************************
 * @function Mode Floating Action Button CLICK handler 
 * @Desc 
 * When the user clicks on the action button in the current mode, we 
 * present the corresponding action dialog box; disable the 
 * navigation bar buttons; and hide the mode tabs. We use currentMode
 * to determine which action dialog box to display.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
for (let i = 0; i < modeActionButtons.length; ++i) {
    modeActionButtons[i].addEventListener("click",function(e) {
        //Hide tab panel
        modeTabPanels[currentMode].classList.add("hidden");
        //Hide and disable all UI elements
        menuBtn.classList.add("hidden");
        searchBtn.classList.add("hidden");
        profileBtn.classList.add("hidden");
        skipLink.classList.add("hidden"); 
        modeTabsContainer.classList.add("hidden");
        //Show dialog box
        modeActionDialogs[currentMode].classList.remove("hidden");
        //Set focus to dialog box's action button
        dialogActionButtons[currentMode].focus();
    });
}

/*************************************************************************
 * @function Dialog Box Action Button CLICK handler 
 * @Desc 
 * When the user clicks on the primary action button in a dialog box, we
 * perform the corresponding action, close the dialog box; restore 
 * the navigation bar buttons; show the mode tabs; restore the 
 * current mode's main page; and set the focus to the current mode's 
 * action button. We use currentMode to determine which mode we're in.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
for (let i = 0; i < dialogActionButtons.length; ++i) {
    dialogActionButtons[i].addEventListener("click",function(e) {
        //Hide dialog box
        modeActionDialogs[currentMode].classList.add("hidden");
        //Show tab panel
        modeTabPanels[currentMode].classList.remove("hidden");
        //Show and enable other UI elements
        menuBtn.classList.remove("hidden");       
        searchBtn.classList.remove("hidden"); 
        profileBtn.classList.remove("hidden");                                 
        skipLink.classList.remove("hidden"); 
        modeTabsContainer.classList.remove("hidden"); 
        //Set focus to floating action button
        modeActionButtons[currentMode].focus();
        //TO DO: Implement mode-specific functionality
    });
}

/*************************************************************************
 * @function Dialog Box Cancel Button CLICK handler 
 * @Desc 
 * When the user clicks on the cancel button in a dialog box, we
 * close the dialog box; restore the navigation bar buttons; 
 *  show the mode tabs; restore the current mode's main page; and set the 
 * focus to the current mode's action button. We use currentMode to 
 * determine which mode we're in.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
/* Dialog Cancel Button Click Handler */
for (let i = 0; i < dialogCancelButtons.length; ++i) {
    dialogCancelButtons[i].addEventListener("click",function(e) {
        //Hide dialog box
        modeActionDialogs[currentMode].classList.add("hidden");
        //Showand enable other UI elements
        menuBtn.classList.remove("hidden");
        searchBtn.classList.remove("hidden");
        profileBtn.classList.remove("hidden");
        skipLink.classList.remove("hidden"); 
        modeTabsContainer.classList.remove("hidden");
        modeTabPanels[currentMode].classList.remove("hidden");
        //Set focus to floating action button
        modeActionButtons[currentMode].focus();
    });
}

/*************************************************************************
 * @function keyDownDialogFocused
 * @Desc 
 * When the user issues a keypress when a dialog box is open,
 * we need to see if it is a tab or escape. If tab, we ensure that the
 * user stays within the dialog. If escape, we cancel out of dialog.
 * @param e, the keyboard event. e.code gives code of key pressed.                  
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 * @global dialogCancelButtons: array of cancel buttons for
 * each mode's dialog box
 *************************************************************************/
function keyDownDialogFocused(e) {
    if (document.activeElement.classList
        .contains("action-button") && 
        e.code === "Tab" && e.shiftKey) {
        //User is shift-tabbing from first focusable item in dialog. 
        //Prevent tab to URL bar by explicitly setting focus to 
        //last focusable item in dialog. 
        modeActionDialogs[currentMode].focus();
        e.preventDefault()
    } else if (document.activeElement.classList
        .contains("cancel-button") && e.code === "Tab" &&
        !e.shiftKey) {
        //User is tabbing from last focusable item in a dialog. 
        //Prevent tab to URL bar by explicitly setting focus 
        //to first focusable item in dialog.
        modeActionDialogs[currentMode].focus();     
        e.preventDefault();
    } else if (document.activeElement.hasAttribute("role") && 
               e.code === "Tab" && e.shiftKey) {
        dialogCancelButtons[currentMode].focus();
        e.preventDefault();
    } else if (e.code === "Escape") { //Close and cancel
        dialogCancelButtons[currentMode].click();
    }
}
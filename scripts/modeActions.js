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
    modeActionButtons[i].addEventListener("click",
      () => transitionToDialog(modeActionDialogs[i],dialogTitles[i]));
}

/*************************************************************************
 * @function Dialog Box Action Button CLICK handler 
 * @Desc 
 * When the user clicks on the primary action button in a dialog box,
 * he placeholder behavior is to call transitionFromDialog to close
 * the dialog box; restore the navigation bar buttons; show the 
 * mode tabs and the current mode's main page; and set the focus 
 * to the current mode's action button.
 * NOTE: This behavior is only the default. When we implement the
 * behavior of a mode dialog, we should remove the corresponding
 * click handler's default behavior.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
 //Feed mode
 dialogActionButtons[0].addEventListener("click",
        () => transitionFromDialog(modeActionDialogs[0]));
//Courses mode
dialogActionButtons[2].addEventListener("click",
        () => transitionFromDialog(modeActionDialogs[2]));
//Buddies mode
dialogActionButtons[3].addEventListener("click",
        () => transitionFromDialog(modeActionDialogs[3]));
       

/*************************************************************************
 * @function Dialog Box Cancel Button CLICK handler 
 * @Desc 
 * When the user clicks on the cancel button in a dialog box, by default we
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
    dialogCancelButtons[0].addEventListener("click",
      () => transitionFromDialog(modeActionDialogs[0]));
    dialogCancelButtons[1].addEventListener("click",function() {
        resetLogRoundForm();
        transitionFromDialog(modeActionDialogs[1]);
    });
    dialogCancelButtons[2].addEventListener("click",
      () => transitionFromDialog(modeActionDialogs[2]));
    dialogCancelButtons[3].addEventListener("click",
      () => transitionFromDialog(modeActionDialogs[3]));



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
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
        //Hide and disable all UI elements except for dialog box
        menuBtn.classList.add("disabled");
        menuBtn.setAttribute("tabindex","-1");
        searchBtn.classList.add("disabled");
        searchBtn.setAttribute("tabindex","-1");
        profileBtn.classList.add("disabled");
        profileBtn.setAttribute("tabindex","-1");
        skipLink.classList.add("hidden"); 
        modeTabsContainer.classList.add("hidden"); //Hide mode tabs
        modeTabPanels[currentMode].classList.add("hidden");
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
        //Showand enable other UI elements
        menuBtn.classList.remove("disabled");
        searchBtn.classList.remove("disabled");
        profileBtn.classList.remove("disabled");
        skipLink.classList.remove("hidden"); 
        modeTabsContainer.classList.remove("hidden"); //Hide mode tabs
        modeTabPanels[currentMode].classList.remove("hidden");
        //TO DO: Implement mode-specific functionality
        //Set focus to floating action button
        modeActionButtons[currentMode].focus();
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
        menuBtn.classList.remove("disabled");
        searchBtn.classList.remove("disabled");
        profileBtn.classList.remove("disabled");
        skipLink.classList.remove("hidden"); 
        modeTabsContainer.classList.remove("hidden"); //Hide mode tabs
        modeTabPanels[currentMode].classList.remove("hidden");
        //Set focus to floating action button
        modeActionButtons[currentMode].focus();
    });
}

function keyDownCancelBtnFocused(e) {
    if (e.code === "Tab") {
        dialogCancelButtons[currentMode].focus();
    }
}
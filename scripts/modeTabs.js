/*************************************************************************
 * File: modeTabs.js
 * Desc: Contains the JavaScript functions to handle interactions 
 * with the mode tabs ("Feed", "Rounds", "Courses", "Buddies"). 
 * We use the w3.org "Example of Tabs with Manual Activiation" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
*************************************************************************/

/*************************************************************************
 * @function switchMode 
 * @desc 
 * Switch from the current mode to a new mode. Unhighlight previous
 * mode tab button, highlight new mode tab button, hide previous mode
 * tab panel, show new mode tab panel, and update mode variables.
 * @param newMode, an integer index (into modeTabButtons and 
 *        modeTabPanels) corresponding to the new mode
 * @global modeTabButtons (array of HTML tab button elements) 
 * @global modeTabPanels (array of HTML tab panel elements)
 * @global currentMode (index of current mode)
 * @global focusedMode (index of mode with current focus)
 *************************************************************************/
 function switchMode(newMode) {
    //Switch mode button
    modeTabButtons[currentMode].classList.remove("modetab-selected");
    modeTabButtons[currentMode].setAttribute("aria-selected",false);
    modeTabButtons[newMode].classList.add("modetab-selected");
    modeTabButtons[newMode].setAttribute("aria-selected",true);
    //Switch tab panel
    modeTabPanels[currentMode].classList.add("hidden");
    modeTabPanels[newMode].classList.remove("hidden");
    //Switch app title
    document.title = "SpeedScore: " + modeNames[newMode];
    currentMode = newMode; //Change mode
    focusedMode = newMode; //Change focused mode
}

/*************************************************************************  
 * Bind switchMode() to each tab button's click handler.
 *************************************************************************/
for (let i = 0; i < modeTabButtons.length; ++i) {
    modeTabButtons[i].addEventListener("click",() => switchMode(i));
}

/*************************************************************************
 * @function keyDownModeTabFocused 
 * @Desc 
 * Handles valid keydown events when a mode tab button has the focus, 
 * Left and Right Arrow change the focus to the previous and 
 * next tab; Home and End change the focus to the first and last tab; 
 * Enter or Space selects the currently focused tab.
 * @param key: the string corresponding the key pressed
 * @global modeTabButtons: array of HTML mode tab button elements
 * @global focusedMode: index (into modeTabButtons) of currently focused
 * mode tab
 * @global currentMode: index (into modeTabButtons) of current mode
 *************************************************************************/
 function keyDownModeTabFocused(key) {
    if (key =="Enter" || key =="Space") {
      //Switch to mode corresponding to tab with current focus
      switchMode(focusedMode); 
    } else if (key =="ArrowRight") {
        //shift focus to next mode tab
        modeTabButtons[focusedMode].setAttribute("tabindex","-1");
        focusedMode = (focusedMode + 1) % modeTabButtons.length; 
        modeTabButtons[focusedMode].setAttribute("tabindex","0");
        modeTabButtons[focusedMode].focus();  
    }  else if (key == "ArrowLeft") {
        //shift focus to prev mode tab
        modeTabButtons[focusedMode].setAttribute("tabindex","-1");
        focusedMode = (focusedMode - 1 + 
            modeTabButtons.length) % modeTabButtons.length; 
        modeTabButtons[focusedMode].setAttribute("tabindex","0");
        modeTabButtons[focusedMode].focus(); 
    } else if (key =="Home") {
        //shift focus to first mode tab
        modeTabButtons[focusedMode].setAttribute("tabindex","-1");
        focusedMode = 0; 
        modeTabButtons[focusedMode].setAttribute("tabindex","0");
        modeTabButtons[focusedMode].focus(); 
    } else if (key =="End") {
        //shift focus to last mode tab
        modeTabButtons[focusedMode].setAttribute("tabindex","-1");
        focusedMode = modeTabButtons.length - 1; 
        modeTabButtons[focusedMode].setAttribute("tabindex","0");
        modeTabButtons[focusedMode].focus();  
    } else if (key == "Tab") { 
        //User is tabbing out of mode tabs. Reset focus to
        //current mode tab
        modeTabButtons[focusedMode].setAttribute("tabindex","-1");
        focusedMode = currentMode; 
        modeTabButtons[focusedMode].setAttribute("tabindex","0");  
        modeTabButtons[focusedMode].focus();
    }  
}
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
    modeTabPanels[currentMode].style.display = "none";
    modeTabPanels[newMode].style.display = "block";
    currentMode = newMode; //Change mode
    focusedMode = newMode; //Change focused mode
}

/*************************************************************************  
 * Bind switchMode() to each tab button's click handler.
 *************************************************************************/
for (let i = 0; i < modeTabButtons.length; ++i) {
    modeTabButtons[i].addEventListener("click",() => switchMode(i));
}
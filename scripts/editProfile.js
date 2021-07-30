/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/


/*************************************************************************
 * @function profileBtn CLICK Handler 
 * @Desc 
 * When the user clicks their profile picture, hide the menu button, tabs,
 * and current tab panel, and show the "Account and Profile Settings" Dialog
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 * @global profileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 profileBtn.addEventListener("click", function(e) {
    modeTabsContainer.classList.add("hidden");
    menuBtn.classList.add("hidden");
    searchBtn.classList.add("hidden");
    profileBtn.classList.add("hidden");
    modeTabPanels[currentMode].classList.add("hidden");
    document.title = "Edit Account and Profile";
    profileSettingsDialog.classList.remove("hidden");
    profileEmailField.focus();
});
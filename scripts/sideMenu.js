/*************************************************************************
 * File: sideMenu.js
 * These functions support interaction with the side menu.
 ************************************************************************/

/*************************************************************************
 * @function menuBtn click handler
 * @desc 
 * When the user clicks the menuBtn, open or close the side menu 
 * based on current menu state.
 *************************************************************************/
 document.getElementById("menuBtn")
   .addEventListener("click", function (e) {
    const sideMenu = document.getElementById("sideMenu");
    const sideMenuIcon = document.getElementById("menuBtnIcon");
    const sideMenuBtn = document.getElementById("menuBtn");
    if (sideMenuIcon.classList.contains("fa-bars")) { //OPEN MENU
        //Change menu icon
        sideMenuIcon.classList.remove("fa-bars");
        sideMenuIcon.classList.add("fa-times");
        //Open menu
        sideMenuBtn.setAttribute("aria-expanded","true");
        sideMenu.classList.add("sidemenu-open");
    } else { //CLOSE MENU
        //Change menu icon
        sideMenuIcon.classList.remove("fa-times");
        sideMenuIcon.classList.add("fa-bars");
        //Close menu
        sideMenuBtn.setAttribute("aria-expanded","false");
        sideMenu.classList.remove("sidemenu-open");
    }
});


/*************************************************************************
* @function keyDownMenuBtnFocused
* @desc 
* Handle keypress when the menuBtn has the focus. Process 
* the arrow keys, space, and enter. All other keys are ignored.
* @param key
* The code of the key that was pressed.
*************************************************************************/
function keyDownMenuBtnFocused(key) {
    if (key === "ArrowDown" || key === "ArrowUp" ||
            key === "Space" || key === "Enter") {
            //Open menu
            menuBtn.click();
            //Focus menu item
            if (key === "ArrowUp") { //Focus on last item
                focusedMenuItem = menuItems.length-1;
            } else { //Focus on first item
                focusedMenuItem = 0;
            }
            menuItems[focusedMenuItem].focus();
        }
}

/*************************************************************************
* @function keyDownMenuItemFocused
* @desc 
* Handle keypress when the menu is open and an item has focus. Per Table
* 4.1 from the book, we handle the following key presses: tab, enter
* escape, up arrow, down arrow, home, and end. 
* are the arrow keys, space, and enter. All other keys are ignored.
* @param key
* The code of the key that was pressed.
* @globals
 * focusedMenuitem is the index of the currently focused menu item
 * menuItems is an array of the HTML elements that are menu items
 * menuBtn is a reference to the menu button HTML element
*************************************************************************/
function keyDownMenuItemFocused(key) {
    if (key == "Enter") { //Close menu and refocus on menu btn
        menuBtn.click();
        menuBtn.focus();        
    } else if (key === "Tab") { //Exit out of menu
        menuBtn.click();
    } else if (key == "Escape") {
        menuBtn.click();
        menuBtn.focus();
    } else if (key === "ArrowUp") { 
        focusedMenuItem = (focusedMenuItem - 1 + menuItems.length) 
          % menuItems.length;
        menuItems[focusedMenuItem].focus();
    } else if (key === "ArrowDown") { 
        focusedMenuItem = (focusedMenuItem + 1) % menuItems.length;
        menuItems[focusedMenuItem].focus();
    } else if (key === "Home") {
        focusedMenuItem = 0;
        menuItems[focusedMenuItem].focus();
    } else if (key === "End") {
        focusedMenuItem = menuItems.length - 1;
        menuItems[focusedMenuItem].focus();
    } 
}
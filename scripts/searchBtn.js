//Search button event listener (add to search.js)
searchBtn.addEventListener("click",function() {
    if (currentMode === 1 && userData.rounds.length > 0) {
        if (searchBox.classList.contains("hidden")) {
            searchBtn.setAttribute("aria-label","Close rounds search");
            searchBox.classList.remove("hidden");
            searchBox.focus(); 
        } else {
            searchBox.value = "";
            searchRoundsTable(searchBox.value);
            searchBox.classList.add("hidden");
            searchBtn.setAttribute("aria-label","Open rounds search");
            searchBtn.focus();
        }
    }
});

//SearchRoundsTable (add to RoundsMode.js)
function searchRoundsTable(searchVal) {
    searchVal = searchVal.toUpperCase(); //case insensitive
    let tr = roundsTable.getElementsByTagName("tr");
    let td, rowText, i, j;
    let numVisibleRows = 0;
    for (i = 1; i < tr.length; i++) {  //Loop through all table rows
      td = tr[i].getElementsByTagName("td");
      rowText = "";
      for (j = 0; j < 3; ++j) { //only consider Date, Course, Score cols
        rowText += td[j].textContent;
      }
      if (rowText != "") {
        if (rowText.toUpperCase().indexOf(searchVal) > -1) {
          tr[i].style.display = ""; //show row
          numVisibleRows++;
        } else {
          tr[i].style.display = "none"; //hide row
        }
      }
    }
    if (numVisibleRows == 1) {
      roundsTableCaption.textContent = "Table displaying 1 speedgolf round";
    } else {
      roundsTableCaption.textContent = "Table displaying " + numVisibleRows + 
       " speedgolf rounds";
    }
  }
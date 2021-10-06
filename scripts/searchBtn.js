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
      roundId = tr[i].id[2]
      console.log("roundId = " + roundId);
      rowText = "";

        for (roundIndex = 0; roundIndex < userData.rounds.length; ++roundIndex) {
            if (userData.rounds[roundIndex].roundNum == roundId) {
            break;
            }
        }

        rowText += userData.rounds[roundIndex].SGS;
        rowText += userData.rounds[roundIndex].course;
        rowText += userData.rounds[roundIndex].date;
        rowText += userData.rounds[roundIndex].holes;
        rowText += userData.rounds[roundIndex].minutes;
        rowText += userData.rounds[roundIndex].notes;
        rowText += userData.rounds[roundIndex].roundNum;
        rowText += userData.rounds[roundIndex].seconds;
        rowText += userData.rounds[roundIndex].strokes;
        rowText += userData.rounds[roundIndex].type;

      if (rowText != "") {
        if (rowText.toUpperCase().indexOf(searchVal) > -1) {
          tr[i].style.display = ""; //show row
          numVisibleRows++;
        } else {
          tr[i].style.display = "none"; //hide row
        }
      }
    }
  }
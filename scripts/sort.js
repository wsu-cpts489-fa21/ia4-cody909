//Add row-item class to rows in table to support sorting. There is only
//one function in roundMode.js that inserts row: addRoundToTable().
//There, add the following line just before call to writeRoundToTable():

//In main.js, add global vars to access "Rounds" table
//Global variables to provide easy access to elements of "Rounds" mode table
const roundsTable = document.getElementById("roundsTable");
const roundsTableCaption = document.getElementById("roundsTableCaption");
const roundsTableSortableColHeaders = document.getElementsByClassName(
  "sortable-header"
);
const roundsTableSortBtns = document.getElementsByClassName("table-sort-btn");
const roundsTableHeaderColLabels = ["date", "course", "score"];
const roundsTableSortIcons = document.getElementsByClassName("sort-icon");
var sortOrder = 0;
var unsort = 0;
var prevCol = -1;
var count = 0;

//sortRoundsTable does the sorting
function sortRoundsTable(colNum) {
    if (prevCol === colNum){
        ++count;
    } else {
        count = 0;
    }
    if (unsort === 1 && count >= 2) {
        const rows = roundsTable.rows.length;
        for (rowIndex = 1; rowIndex < rows - 1; ++rowIndex) {
          roundsTable.deleteRow(1);
        }
        populateRoundsTable();
        roundsTable.deleteRow(rows);
        console.log(colNum - 1);
        roundsTableSortIcons[colNum - 1].classList.remove("fa-sort-amount-down");
        roundsTableSortIcons[colNum - 1].classList.add("fa-sort");
        unsort = 0;
      } else {
  const sortOrder =
    roundsTableSortBtns[colNum - 1]
      .getAttribute("aria-label")
      .indexOf("ascending") != -1
      ? "ascending"
      : "descending";
  const futureSortOrder =
    sortOrder === "ascending" ? "descending" : "ascending";
  w3.sortHTML("#roundsTable", ".row-item", "td:nth-child(" + colNum + ")");


      if(sortOrder === "descending") {
          unsort = 1;
      }
    for (let i = 1; i <= 3; ++i) {
        if (colNum === i) {
          if (roundsTableSortIcons[i - 1].classList.contains("fa-sort")) {
            roundsTableSortIcons[i - 1].classList.remove("fa-sort");
          }
          if (
            roundsTableSortIcons[i - 1].classList.contains(
              "fa-sort-amount-down-alt"
            )
          ) {
            roundsTableSortIcons[i - 1].classList.remove("fa-sort-amount-down-alt");
          }
          if (
            roundsTableSortIcons[i - 1].classList.contains("fa-sort-amount-down")
          ) {
            roundsTableSortIcons[i - 1].classList.remove("fa-sort-amount-down");
          }
          roundsTableSortIcons[i - 1].classList.add(
            sortOrder === "ascending"
              ? "fa-sort-amount-down-alt"
              : "fa-sort-amount-down"
          );
          roundsTableSortBtns[i - 1].setAttribute(
            "aria-label",
            "Sort " +
              futureSortOrder +
              " by " +
              roundsTableHeaderColLabels[colNum - 1]
          );
          roundsTableSortableColHeaders[i - 1].setAttribute("aria-sort", sortOrder);
        } else {
          if (
            roundsTableSortIcons[i - 1].classList.contains(
              "fa-sort-amount-down-alt"
            )
          ) {
            roundsTableSortIcons[i - 1].classList.remove("fa-sort-amount-down-alt");
          }
          if (
            roundsTableSortIcons[i - 1].classList.contains("fa-sort-amount-down")
          ) {
            roundsTableSortIcons[i - 1].classList.remove("fa-sort-amount-down");
          }
          roundsTableSortIcons[i - 1].classList.add("fa-sort");
          roundsTableSortBtns[i - 1].setAttribute(
            "aria-label",
            "Sort ascending by " + roundsTableHeaderColLabels[i - 1]
          );
          roundsTableSortableColHeaders[i - 1].setAttribute("aria-sort", "none");
        }
      }
    }
    prevCol = colNum;
}

//Add as click handler to rounds table sort buttons.
for (let i = 0; i < roundsTableSortBtns.length; ++i) {
  roundsTableSortBtns[i].addEventListener("click", () =>
    sortRoundsTable(i + 1)
  );
}

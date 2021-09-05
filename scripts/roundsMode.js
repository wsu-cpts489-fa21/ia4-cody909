/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode, 
 * including the "Log Round" modal.
*************************************************************************/

//set firstFocusableItem in dialog to the date field
let firstFocusableLogRoundItem = roundDate;

//Set date field to today
roundDate.valueAsNumber = 
Date.now()-(new Date()).getTimezoneOffset()*60000;

/*************************************************************************
 * @function updateSGS 
 * @Desc 
 * When the strokes, minutes or seconds fields are updated, 
 * update the speedgolf score accordingly.
 * @global roundStrokes: Form's strokes field
 * @global roundMinutes: Form's minutes field
 * @global roundSeconds: Form's seconds field
 *************************************************************************/
function updateSGS() {
    roundSGS.value = 
      (roundStrokes.valueAsNumber + roundMinutes.valueAsNumber) + 
      ":" + roundSeconds.value
  }
/*************************************************************************
 * @function changeSeconds 
 * @Desc 
 * When the seconds field is updated, we need to ensure that the
 * seconds field of the round time is zero-padded. We also need to 
 * call updateSGS to update the speedgolf score based on the new seconds value.
 * @global roundStrokes: Form's strokes field
 * @global roundMinutes: Form's minutes field
 * @global roundSeconds: Form's seconds field
 *************************************************************************/
function changeSeconds() {
    if (roundSeconds.value.length < 2) {
      roundSeconds.value = "0" + roundSeconds.value;
    }
    updateSGS();
  }

  /*************************************************************************
 * @function resetLogRoundForm 
 * @Desc 
 * When the user exits the "Log Round" Dialog, reset the form to
 * show blank data and default values
 * @global roundDate: Form's date field
 * @global roundCourse: Form's course field
 * @global roundType: Form's type field
 * @global roundStrokes: Form's strokes field
 * @global roundMinutes: Form's minutes field
 * @global roundSeconds: Form's seconds field
 * @global roundSGS: Form's Speedgolf Score field
 * @global roundsErrBox: <div> containing the error messages
 * @global roundCourseErr: Error message for course field
 * @global roundStrokesErr: Error message for strokes field
 * @global roundMinutesErr: Error message for minutes field
 * @global roundSecondsErr: Error message for seconds  field
 * @global roundNotesErr: Error message for notes field
 *************************************************************************/
function resetLogRoundForm() {
  //Set date to today.
  roundDate.valueAsNumber =
    Date.now()-(new Date()).getTimezoneOffset()*60000;
  roundCourse.value = "";
  roundType.value = "practice";
  roundHoles.value = "18";
  roundStrokes.value = "80";
  roundMinutes.value = "60";
  roundSeconds.value = "00";
  roundSGS.value = "140:00";
  roundNotes.value = "";
  roundDateErr.classList.add("hidden");
  roundCourseErr.classList.add("hidden");
  roundStrokesErr.classList.add("hidden");
  roundMinutesErr.classList.add("hidden");
  roundSecondsErr.classList.add("hidden");
  roundNotesErr.classList.add("hidden");
  roundErrBox.classList.add("hidden");
  firstFocusableLogRoundItem = roundDate;
}

/*************************************************************************
* @function roundUpdatedClose CLICK Handler 
* @desc 
* When the user clicks on the close button of the "Round Logged"
* toast notification on the "Rounds" mode page, close it.
* @global roundLogged: The "Round Logged" toast
*************************************************************************/
roundUpdatedClose.addEventListener("click",function() {
  roundUpdated.classList.add("hidden");
});

/*************************************************************************
* @function addRoundToTable 
* @desc 
* Adds a newly logged round, which assumed to be the last array entry in
* userData.rounds, to the "Rounds" table.
* @global userData: the current user's data object
*************************************************************************/
function addRoundToTable() {
  const roundId = userData.roundCount;
  const roundIndex = userData.rounds.length-1;
  if (roundsTable.rows[1].innerHTML.includes ("colspan")) {
    //empty table! Remove this row before adding new one
    roundsTable.deleteRow(1);
  }
 //Write new row containing new round to table
  let thisRound = roundsTable.insertRow(1);
  thisRound.id = "r-" + roundId; //set unique id of this row so we can access it later
  thisRound.innerHTML = "<td>" + userData.rounds[roundIndex].date + "</td><td>" +
    userData.rounds[roundIndex].course + "</td><td>" + 
    userData.rounds[roundIndex].SGS + " (" + userData.rounds[roundIndex].strokes +
    " in " + userData.rounds[roundIndex].minutes + ":" + 
    userData.rounds[roundIndex].seconds + 
    ")</td>" +
    "<td><button aria-label='View and Edit Round'" + 
    "onclick='editRound(" + roundId + ")'><span class='fas fa-eye'>" +
    "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
    "<td><button aria-label='Delete Round'" + 
    "onclick='confirmDelete(" + roundId + ")'>" +
    "<span class='fas fa-trash'></span></button></td>";
 }


/*************************************************************************
* @function logRound 
* @desc 
* Build a JavaScript object containing a new round data, save the
* round to localStorage, update the "Rounds"table, return the user to 
* "Rounds" mode page, and display a toast message indicating that a 
* new round was logged.
* @global loginPage: The "Log In" page
* @global roundDate: The date field in "Log Round" form
* @global roundDate: The course field in "Log Round" form
* @global roundDate: The type field in "Log Round" form
* @global roundDate: The holes field in "Log Round" form
* @global roundDate: The strokes field in "Log Round" form
* @global roundDate: The minutes field in "Log Round" form
* @global roundDate: The seconds field in "Log Round" form
* @global roundDate: The SGS field in "Log Round" form
* @global roundDate: The minutes field in "Log Round" form
* @global roundUpdated: The round updated toast notification
* @global roundUpdatedMsg: The message field of the round updated toast
*************************************************************************/
function logRound() {
  //Create new object with form data
  const newRound = {
    date: roundDate.value,
    course: roundCourse.value,
    type: roundType.value,
    holes: roundHoles.value,
    strokes: roundStrokes.value,
    minutes: roundMinutes.value,
    seconds: roundSeconds.value,
    SGS: roundSGS.value,
    notes: roundNotes.value,
    roundNum: ++(userData.roundCount)
  };
  //Push round object to rounds array
  userData.rounds.push(newRound);
  //Save to local storage
  localStorage.setItem(userData.accountInfo.email,
    JSON.stringify(userData));
  //Reset form to prepare for next visit
  resetLogRoundForm();
  //Add new round to table
  addRoundToTable();
  //Transition back to mode page
  roundUpdatedMsg.textContent = "New Round Logged!";
  roundUpdated.classList.remove("hidden");
  transitionFromDialog(roundsModeDialog);
}

/*************************************************************************
* @function logRoundForm SUBMIT Handler 
* @Desc 
* When the user clicks on the "Create Account" button, we first check the
* validity of the fields, presenting accessible
* error notifications if errors exist. If no errors exist, we
* call the createAccount() function, passing in the account data
* @global createAccountForm: the <form> element whose 
*         SUBMIT handler is triggered
* @global acctEmailField: Form's email field
* @global acctPasswordField: Form's password field
* @global acctPasswordRepeatField: Form's repeat pw field
* @global acctDisplayNameField: Form's display name field
* @global acctSecurityQuestionField: Form's security q field
* @global acctSecurityAnswerField: Form's security answ field
* @global acctErrBox: <div> containing the error messages
* @global acctEmailErr: Error message for email field
* @global acctPasswordErr: Error message for password field
* @global acctRepeatPasswordErr: Error message for repeat pw field
* @global acctDisplaynameErr: Error message for display name field
* @global acctSecurityQuestionErr: Error message for security q field
* @global acctSecurityAnswerErr: Error message for security answ field
*************************************************************************/
logRoundForm.addEventListener("submit",function(e) {
  e.preventDefault(); //Prevent default submit behavior
  //Is the date valid?
  let dateValid = !roundDate.validity.valueMissing;
  //Is the course field valid?
  let courseValid = !roundCourse.validity.tooLong && 
                    !roundCourse.validity.valueMissing;
  //Is the password field valid?
  let strokesValid = !roundStrokes.validity.typeMismatch &&
                     !roundStrokes.validity.rangeUnderflow &&
                     !roundStrokes.validity.rangeOverflow && 
                     !roundStrokes.validity.valueMissing;
  //Is the minutes field valid?
  let minutesValid = !roundMinutes.validity.typeMismatch &&
                     !roundMinutes.validity.rangeUnderflow &&
                     !roundMinutes.validity.rangeOverflow && 
                     !roundMinutes.validity.valueMissing;
  //Is the seconds field valid?
  let secondsValid = !roundSeconds.validity.typeMismatch &&
                     !roundSeconds.validity.rangeUnderflow &&
                     !roundSeconds.validity.rangeOverflow && 
                     !roundSeconds.validity.valueMissing;
  //Is the notes field valid?
  let notesValid = !roundNotes.validity.tooLong;
  if (courseValid && strokesValid && minutesValid &&
      secondsValid && notesValid &&dateValid) { 
      //All is well -- log round
      logRound();
     return;
  }
  //If here, at least one field is invalid: Display the errors
  //and allow user to fix them.
  roundErrBox.classList.remove("hidden");
  document.title = "Error: Log Round";
  if (!notesValid) { 
    roundNotesErr.classList.remove("hidden");
    roundNotesErr.focus();
    firstFocusableLogRoundItem = roundNotesErr;
  } else {
    roundNotesErr.classList.add("hidden");
  }
  if (!secondsValid) { 
    roundSecondsErr.classList.remove("hidden");
    roundSecondsErr.focus();
    firstFocusableLogRoundItem = roundSecondsErr;
  } else {
    roundSecondsErr.classList.add("hidden");
  }
  if (!minutesValid) { 
    roundMinutesErr.classList.remove("hidden");
    roundMinutesErr.focus();
    firstFocusableLogRoundItem = roundMinutesErr;
  } else {
    roundMinutesErr.classList.add("hidden");
  }
  if (!strokesValid) { 
    roundStrokesErr.classList.remove("hidden");
    roundStrokesErr.focus();
    firstFocusableLogRoundItem = roundStrokesErr;
  } else {
    roundStrokesErr.classList.add("hidden");
  }
  if (!courseValid) { 
      roundCourseErr.classList.remove("hidden");
      roundCourseErr.focus();
      firstFocusableLogRoundItem = roundCourseErr;
  } else {
      roundCourseErr.classList.add("hidden");
  }
  if (!dateValid) { 
    roundDateErr.classList.remove("hidden");
    roundDateErr.focus();
    firstFocusableLogRoundItem = roundDateErr;
} else {
    roundDateErr.classList.add("hidden");
}
});

/*************************************************************************
* @function cancelCreateAccountBtn CLICK Handler 
* @Desc 
* When the user clicks the "Cancel" button to exit "Create Account" Dialog, 
* reset the form and transition to the Log In page.
* @global createAccountDialog: The "Create Account" dialog
* @global loginPage: The Log In page
*************************************************************************/
cancelCreateAccountBtn.addEventListener("click",function(e) {
  resetCreateAccountForm();
  document.title = "Log In to SpeedScore";
  createAccountDialog.classList.add("hidden");
  loginPage.classList.remove("hidden");
});

/*************************************************************************
* @function keyDownRoundDialogFocused 
* @desc 
* When the user presses a key with an element in the Log Round 
* dialog focused, we implement the accessible keyboard interface for
* a modal dialog box. This means that "Escape" dismisses the dialog and
* that it is impossible to tab outside of the dialog box.
* @global firstFocusableLogRoundItem: References the first focusable
*         item in "Log Round" dialog. 
* @global roundsModeLogCancelBtn: The "Cancel" button (last focusable 
*         item in "Log Round" dialog)
*************************************************************************/
function keyDownRoundDialogFocused(e) {
  if (e.code === "Escape") {
    roundsModeLogCancelBtn.click();
    return;
  }
  if (e.code === "Tab" && document.activeElement == firstFocusableLogRoundItem &&
     e.shiftKey) {
      //shift focus to last focusable item in dialog
      roundsModeLogCancelBtn.focus();
      e.preventDefault();
      return;
  }
  if (e.code === "Tab" && document.activeElement == roundsModeLogCancelBtn &&
      !e.shiftKey) {
      //shift focus to first focusable item in dialog
      firstFocusableLogRoundItem.focus();
      e.preventDefault();
      return;
  }
}
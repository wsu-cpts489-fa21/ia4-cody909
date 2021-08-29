/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode, 
 * including the "Log Round" modal.
*************************************************************************/

//updateSGS --When the strokes, minutes or seconds fields are updated, we need
//to update the speedgolf score accordingly.
function updateSGS() {
    roundSGS.value = 
      (roundStrokes.valueAsNumber + roundMinutes.valueAsNumber) + 
      ":" + roundSeconds.value
  }

//changeSeconds - When the seconds field is updated, we need to ensure that the
//seconds field of the round time is zero-padded. We also need to call updateSGS to
//update the speedgolf score based on the new seconds value.
function changeSeconds() {
    if (roundSeconds.value.length < 2) {
      roundSeconds.value = "0" + roundSeconds.value;
    }
    updateSGS();
  }
function copyRange() {
  var sourceFile = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = sourceFile.getSheetByName('Source'); //source sheet
  var rows = sourceSheet.getDataRange(); //source sheet
  
  //var testRange = sourceSheet.getRange('I:I'); //range to check
  //var testValue = testRange.getValues(); 
  //var targetFile = SpreadsheetApp.openById('1IulGUNaycAZy3DZGZMe8dAdFiNg_N0b9JdwdRy218uE');
  //var targetSheet = targetFile.getSheetByName('Dest'); //destination sheet
  var targetSheet = sourceFile.getSheetByName('Dest'); //destination sheet
  var copiedData = []; // empty array to map Done requests data
  var j =[]; // empty array to delete rows

  sourceFile.toast("Script is running now. Please don't touch the sheet yet....!");

  /*
  //Condition check in I:I; If true copy the same row to data array
  for (i = 0; i < testValue.length; i++) {
    if ( testValue[i] == 'Done') {
      copiedData.push.apply(copiedData,sourceSheet.getRange(i+1,1,1,7).getValues());
      //Copy matched ROW numbers to j
      j.push(i);
    }
    else if ( testValue[i] == 'No') {
      sourceSheet.deleteRow(i+1); // Delete the out of stock rows
    }
  }
  
  /*copiedData.filter(function(e, i){
    // Filter all the cells on the 2nd column that have value
    return e[1] !== ""
  }).map(function(e) {
    // Only take the content of the 2nd column
    return [e[1]];
  });*/
  
  /*if (copiedData.length > 0) {
    //Copy copiedData array to destination sheet
    targetSheet.getRange(targetSheet.getLastRow()+1,1,copiedData.length,copiedData[0].length).setValues(copiedData); 

    Logger.log("Proccess the done requests");

    //Delete matched rows in the source sheet
    for (i = 0;  i< j.length; i++){
      var k = j[i]+1;
      sourceSheet.deleteRow(k);

    //Alter j to account for deleted rows
      if (!(i == j.length-1)) {
        j[i+1] = j[i+1]-i-1;
      }
    }
    sourceFile.toast("Requests are inserted into Database successfully!");
  } else {

    Logger.log("No Done requests"); 
    sourceFile.toast("No requests are done!");
    return;  
  } // if there is no Done request data, return
  */

  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var rowsDeleted = 0;
  for (var i = 0; i <= numRows - 1; i++) {
      var row = values[i];
      if (row[8] == 'x') { // This searches all cells in columns A (change to row[1] for columns B and so on) and deletes row if cell is empty or has value 'delete'.
      sourceSheet.deleteRow((parseInt(i)+1) - rowsDeleted);
      rowsDeleted++;
    } else if (row[8] == 'Done') {
      //copiedData.push.apply(copiedData,sourceSheet.getRange(i+1,1,1,7).getValues());
      //Copy matched ROW numbers to j
      //j.push(i);
    }
  }

  addRows(rowsDeleted);

}

function addRows(deletedRows) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName('Source'); //source sheet
  var lastRow = ws.getLastRow();

  //var lastCol = ws.getLastColumn();
  //var range = ws.getRange(lastRow,1,1,lastCol);
  //range.copyTo(ws.getRange(lastRow, 1, deletedRows, lastCol), {contentsOnly:true});

  // If deleted rows > 0 then insert rows and set borderlines
  if (deletedRows > 0) {
    ws.insertRowsAfter(lastRow, deletedRows); // insert deleted rows after last row of the sheet
    //ws.getRange(lastRow, 1, lastRow+deletedRows, 8).setBorder(true, true, true, true, true, true); // set borderlines
    //ws.getRange(lastRow, 10, lastRow+deletedRows, 1).setBorder(true, true, true, true, true, true); // set borderlines
  } else return;
}

/* function testReplaceInSheet(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet10");
    replaceInSheet(sheet,'\\n','<br>');
}

function replaceInSheet(sheet, to_replace, replace_with) {
  //get the current data range values as an array
  var values = sheet.getDataRange().getValues();

  //loop over the rows in the array
  for(var row in values){

    //use Array.map to execute a replace call on each of the cells in the row.
    var replaced_values = values[row].map(function(original_value){
      return original_value.toString().replace(to_replace,replace_with);
    });

    //replace the original row values with the replaced values
    values[row] = replaced_values;
  }

  //write the updated values to the sheet
  sheet.getDataRange().setValues(values);
} */

function showModalView() {
  var ss = SpreadsheetApp.openById("1qxK5PkYquWE6639pWwxIc3dt-IoJUzfdWznFJRvmVMk");
  var sheet = ss.getSheetByName("Sheet11");
  var data = sheet.getDataRange().getDisplayValues();

  ss.toast("Please wait...!");

  var testData = data.filter(function(e, i){
    // Filter all the cells on the 15nd column (Column O) that have value
    return e[0] !== ""
  }).map(function(e) {
    // Only take the content of the 2nd column
    return [e[0],e[1],e[2],e[3]];
  });

  var newRow = sheet.getLastRow() + 1;
  //var newRow = getFirstEmptyRowByColumnArray();
  Logger.log(newRow);
  Logger.log(testData.length);
  Logger.log(testData[0].length);

  for (var i = 1; i < 100; i++) {

    sheet.getRange(i, 1, testData.length, testData[0].length).setValues(testData); // transfer data to QC sheet
  }

  ss.toast("Finished!");
}

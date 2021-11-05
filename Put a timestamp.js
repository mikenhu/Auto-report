// This function is to add the timestamp for the most recent updated data
// in order to trigger a small edit to the sheet. It is triggered once a day before 
// running the emailing scripts.
function timeStampDataUpdate() {
  var spreadsheet = SpreadsheetApp.getActive();
  var dR = spreadsheet.getSheetByName('Daily Report Email');
  dR.getRange('C2').setValue(new Date());
};


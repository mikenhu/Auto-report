function clearCells() {
  var sheet = SpreadsheetApp.openById("1qxK5PkYquWE6639pWwxIc3dt-IoJUzfdWznFJRvmVMk").getSheetByName(DAILY_REPORT_SHEET);
  sheet.getRange('I6:I30').clearContent(); 
}
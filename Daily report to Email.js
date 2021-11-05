var DAILY_REPORT_SHEET = "Daily Report Email";

function dailyReport(){
  var ss = SpreadsheetApp.openById("1qxK5PkYquWE6639pWwxIc3dt-IoJUzfdWznFJRvmVMk")
  var sheet = ss.getSheetByName(DAILY_REPORT_SHEET);
   
  //var chart = sheet.getCharts()[0];
  //var recipient = sheet.getRange("C1").getDisplayValue();
  //var date = sheet.getRange("C2").getDisplayValue();
  //var date = Utilities.formatDate(new Date(),Session.getTimeZone(), "dd/MM/YYYY");
  //var yesterday = sheet.getRange("C3").getDisplayValue();

  var userAndDate = sheet.getRange("C1:C3").getDisplayValues();

  //Logger.log(userAndDate);

  var template = HtmlService.createTemplateFromFile('Daily report template');

  //template.date = date;
  template.yesterday = userAndDate[2];

  //Logger.log(template.yesterday);

  var statData = getTableData(DAILY_REPORT_SHEET, "B5:I", 6);
  var cancelData = getTableData(DAILY_REPORT_SHEET, "L5:R", 0);
  var reworkData = getTableData(DAILY_REPORT_SHEET, "U5:Y", 0);
  var invalidRepairData = getTableData(DAILY_REPORT_SHEET, "AB5:AL", 0);
  
  var dailySheetURL = getSheetUrl(DAILY_REPORT_SHEET);

  template.statTableValues = statData[0];
  template.cancelTableValues = cancelData[0];
  template.reworkTableValues = reworkData[0];
  template.invalidRepairTableValues = invalidRepairData[0];

  Logger.log(statData[0]);

  template.url = dailySheetURL;

  template.statTableColors = statData[1];
  template.cancelTableColors = cancelData[1];
  template.invalidRepairTableColors = invalidRepairData[1];
  template.reworkTableColors = reworkData[1];
  
  //var recipient = Session.getActiveUser().getEmail();
  var recipient = userAndDate[0].toString(); // Has to be string type
  var subject = "Daily productivity report for " + userAndDate[1];
  var body = '';
  
  var options = {
    htmlBody: template.evaluate().getContent(),
  };

  //Logger.log(options);

  if (statData[0].length>1 && recipient!== null){
    MailApp.sendEmail(recipient, subject, body, options);
    ss.toast("Daily report is sent!");
    clearCells();
    // Clear comments from previous day
    //sheet.getRange("H6:H").clearContent();
  } else return;

}

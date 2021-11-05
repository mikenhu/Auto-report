var WEEKLY_REPORT_SHEET = "Weekly Report Email";

function weeklyReport(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(WEEKLY_REPORT_SHEET);

  //var recipient = sheet.getRange("C1").getDisplayValue();
  var currentWk = sheet.getRange("C2").getDisplayValue();
  //var date = Utilities.formatDate(new Date(),Session.getTimeZone(), "dd/MM/YYYY");
  var lastWk = sheet.getRange("C3").getDisplayValue();

  var templateWK = HtmlService.createTemplateFromFile('Weekly report template');
  
  var statData = getTableData(WEEKLY_REPORT_SHEET,"B6:I",5)
  var chartData = getDataCharts(WEEKLY_REPORT_SHEET);
  var weeklySheetURL = getSheetUrl(WEEKLY_REPORT_SHEET);
  //Logger.log(chartData);

  // pass parameter last week number from script to HTML template
  templateWK.lastWk = lastWk;

  // pass stat table parameters from script to HTML
  templateWK.statTableValues = statData[0];
  
  // pass image parameter from script to HTML 
  templateWK.chartDataValues = chartData[0];

  templateWK.url = weeklySheetURL;

  //Logger.log(tableData[0]);

  //Logger.log(templateWK.chartDataValues);

  var recipient = Session.getActiveUser().getEmail();
  var subject = "Weekly productivity report for " + currentWk;
  var body = '';
   
  var options = {
    htmlBody: templateWK.evaluate().getContent(),
    inlineImages: chartData[1],
  };

  //Logger.log(options);
  // if there's any data in the table, send the report to email
  if (statData[0].length > 1){
    MailApp.sendEmail(recipient, subject, body, options);
    ss.toast("Weekly report is sent!");
  } else return;

}

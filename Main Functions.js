// Tables will be stored in two arrays, 1st array is for table data names, 2nd array is for table colors
function getTableData(sheetName, range, conditionCol) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheetName);
  var data = sheet.getRange(range);
  var values = data.getDisplayValues();
  var colors = data.getBackgrounds();

  Logger.log(values);

  // Start of adding condition
  var newColors = [];
  var newValues = [];
  for (var i in values){
    //conditionCol = 0 ; // let's say your condition in the first column
    
    var key = values[i][conditionCol];
    if (key != ""){ // change your conditions here
      newValues.push(values[i]);
      newColors.push(colors[i]);
    }
  }

  // Filter empty values
  //var valueFiltered = newValues.filter(function (x) { /* here, x is an array, not an object */
  //  return !(x.every(element => element === (undefined || null || '')))
  //});
  // End
  return [newValues, newColors];
}


// Get stat data table and table colors
/*function getStatTable(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Daily Report Email");
  var data = sheet.getRange("B5:H");
  var values = data.getValues();
  var colors = data.getBandings().values();
  
  Logger.log(colors);

  // Start of adding condition
  var newColors = [];
  var newValues = [];
  for (var i in values){
    var j = 2 ; // let's say your condition in the second column
    var key = values[i][j];
    if (key != ""){ // change your conditions here
      newValues.push(values[i]);
      newColors.push(colors[i]);
      Logger.log(newColors[i]);
    }
  }
  // End
  return [newValues, colors];
}
*/


// Charts will be stored in two arrays, 1st array is for chart names, 2nd array is for objects
function getDataCharts(){
  const ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(WEEKLY_REPORT_SHEET);
  var charts = sheet.getCharts();
  
  // setup some variables for our charts
  var chartBlobs = new Array(); 
  var inlineImage = {};
  var imgName = new Array();
  
  charts.forEach(function(chart, i){
    chartBlobs[i] = chart.getAs("image/png"); //get charts as images
    
    imgName[i] = "chart"+i; //chart name
    
    inlineImage["chart"+i] = chartBlobs[i]; //set charts as objects

  });

  return [imgName,inlineImage];
}

/*
// Generate charts
function varSet(){

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var dataRange = sheet.getRange("N7:O");

  buildChart(sheet, dataRange);

}

function buildChart(sheet, dataRange) {

  var newChart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(dataRange)
    .setPosition(5, 5, 0, 0)
    .build();

  sheet.insertChart(newChart);

};
*/

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

function getSheetUrl(name) {
  var ss = SpreadsheetApp.getActive();
  var ws = ss.getSheetByName(name);
  var url = '';
  url += ss.getUrl();
  url += '#gid=';
  url += ws.getSheetId(); 
  
  return url;
}

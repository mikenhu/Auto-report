function weeklyEmail() {
  var ss = SpreadsheetApp.openById("1qxK5PkYquWE6639pWwxIc3dt-IoJUzfdWznFJRvmVMk");
  var ws = ss.getSheetByName('Weekly Report Email');

  timeStampDataUpdate();
  //var emailAddress = ws.getRange("C4").getValue();
  var emailAddress = 'nam@swappie.com';
  var subject = ws.getRange("B2").getValue();
  var message = ws.getRange("B3").getValue();
  //var lastWkNumber = ws.getRange("C3").getValue();
  var workerListLastWk= ws.getRange("B5:E").getDisplayValues();

  var TABLEFORMAT = 'cellspacing="2" cellpadding="2" dir="ltr" border="1" style="width:100%;table-layout:fixed;font-size:10pt;font-family:arial,sans,sans-serif;border-collapse:collapse;border:1px solid #ccc;font-weight:normal;color:black;background-color:white;text-align:center;text-decoration:none;font-style:normal;'
  var htmlTable = '<table ' + TABLEFORMAT +' ">';

  //Logger.log(message);

  var workerPointsLastWk = workerListLastWk.filter(function(e, i){
    // Filter all the cells on the 2nd column that have value
    return e[1] !== "";
  }).map(function(e) {
    // Only take the content of the 2nd column
    return [e[0],e[1],e[2]];
  });

  //message += '<div>'+message+'</div><div><br></div><div>';

  Logger.log(workerPointsLastWk.length);

  for (row = 0; row<workerPointsLastWk.length; row++){

    htmlTable += '<tr>';

    for (col = 0 ;col<workerPointsLastWk[row].length; col++){
      if (workerPointsLastWk[row][col] === "" || 0) {htmlTable += '<td>' + 'None' + '</td>';} 
      else
        if (row === 0)  {
          htmlTable += '<th>' + workerPointsLastWk[row][col] + '</th>';
        }

      else {
        htmlTable += '<td>' + workerPointsLastWk[row][col] + '</td>';
      }
    }
    htmlTable += '</tr>';
  }

  htmlTable += '</table>';

  if (workerPointsLastWk.length >2) {
    //MailApp.sendEmail(emailAddress, subject, message, {htmlBody: htmlTable});
    Logger.log("Mail sent!");
    // MailApp.sendEmail(emailAddress, subject, message +" "+ lastWkNumber +"\n"+ workerPointsLastWk.map(function(item) {return  "\n" + item[0] + ", " +item[1] + ", " +item[2];}));
    //Logger.log(message +" "+ lastWkNumber +"\n\n"+ workerPointsLastWk.map(function(item) {return "\n" + item[0] + ", " +item[1] + ", " +item[2];}));
  }
  else return;
}

var DAILY_FOLDER = "Auto Daily Reports";
var WEEKLY_FOLDER = "Auto Weekly Reports";

// Run scripts from menu bar
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Reports")
    .addItem("Send a daily report now", 'dailyReport')
    .addItem("Send a weekly report now",'weeklyReport')
    .addItem("Start timer for automation‼️ (RUN THIS FIRST when set up to ensure data stay updated)",'hourlyTrigger')
    .addItem("Install morning Daily report @ around 5.30 AM automation",'dailyTrigger')
    .addItem("Install morning Weekly report @ around 5.30 AM on every Monday automation",'weeklyTrigger')
    .addItem("Remove all automated reports",'deleteTriggers')
    .addToUi();
}

/**
 * Deletes all the triggers.
**/
function deleteTriggers(){
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(trigger){
    try{
      // check if the trigger is not the update data timer
      for (var i = 0; i < triggers.length; i++){ 
        if (triggers[i].getHandlerFunction().indexOf('timeStampDataUpdate') != 0) 
        {
          ScriptApp.deleteTrigger(triggers[i]);
        }
      }
    } catch(e) {
      throw e.message;
      MailApp.sendEmail("nam@swappie.com", "Error report", 
      "\r\nMessage: " + e.message
      + "\r\nFile: " + e.fileName
      + "\r\nLine: " + e.lineNumber);
    };
    Utilities.sleep(1000);
  });
  removeLabel();
  SpreadsheetApp.getUi().alert("Auto reports & relating labels are removed, no more for you 😞");
};


/* //Trigger callback function
function scheduledTrigger(hours,minutes){
  
  var today_D = new Date();
  var year = today_D.getFullYear();
  var month = today_D.getMonth();
  var day = today_D.getDate();
    
  pars = [year,month,day,hours,minutes];
    
  var scheduled_D = new Date(...pars);
  var hours_remain=Math.abs(scheduled_D - today_D) / 36e5;
  ScriptApp.newTrigger("function_Triggered")
  .timeBased()
  .after(hours_remain * 60 *60 * 1000)
  .create()
}*/

// Set timer to update data every hour
/*function hourlyTrigger() { 
  if(checkIfTriggerExists('timeStampDataUpdate') !== true) {
    ScriptApp.newTrigger('timeStampDataUpdate')
    .timeBased()
    .everyHours(1)
    .create();
    SpreadsheetApp.getUi().alert("Hourly timer is all set 💪");
  } else {
    SpreadsheetApp.getUi().alert("Hourly timer is already set! 🤭");
    return;
  }
}*/

// Set automation trigger
function automationTrigger() { 
  if(checkIfTriggerExists('timeStampDataUpdate') !== true) {
    hourlyTrigger();
    SpreadsheetApp.getUi().alert("Hourly timer is all set 💪");
  } else {
    SpreadsheetApp.getUi().alert("Hourly timer is already set! 🤭");
    return;
  }
}

// Set hourly trigger
function hourlyTrigger() {
  ScriptApp.newTrigger('timeStampDataUpdate')
  .timeBased()
  .everyHours(1)
  .create();
}

// Trigger every Monday at 05:30.
function weeklyTrigger() { 
  if(checkIfTriggerExists('weeklyReport') !== true) {
    ScriptApp.newTrigger('weeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(5)
    .nearMinute(30)
    .create();
    if(checkIfTriggerExists('timeStampDataUpdate') !== true) {hourlyTrigger()};
    SpreadsheetApp.getUi().alert("Weekly report is all set 👌");
  } else {
    SpreadsheetApp.getUi().alert("Weekly report is already set! 🤔");
    return;
  }
  //GmailLabelSetup(WEEKLY_FOLDER,"#000000","#43d692");
}

// Trigger everyday at 05:30.
function dailyTrigger() {
  if(checkIfTriggerExists('dailyReport') !== true) {
    ScriptApp.newTrigger("dailyReport")
    .timeBased()
    .atHour(5)
    .nearMinute(30)
    .everyDays(1)
    .create();
    if(checkIfTriggerExists('timeStampDataUpdate') !== true) {hourlyTrigger()};
    SpreadsheetApp.getUi().alert("Daily report is set.");
  } else {
    SpreadsheetApp.getUi().alert("Daily report is already set!");
    return;
  }
  //GmailLabelSetup(DAILY_FOLDER,"#000000","#ffbc6b");
}

// Shorten codes for triggers
/*
function triggerFunction(triggerName, hour, minute, daily) {
  if(checkIfTriggerExists(triggerName) !== true) {
    ScriptApp.newTrigger(triggerName)
    .timeBased()
    .atHour(hour)
    .nearMinute(minute)
    .everyDays(daily)
    .create();
    if(checkIfTriggerExists('timeStampDataUpdate') !== true) {hourlyTrigger()};
    SpreadsheetApp.getUi().alert("Daily report is set.");
  } else {
    SpreadsheetApp.getUi().alert("Daily report is already set!");
    return;
  }
}

function eveningDaily() {
  triggerFunction('dailyReport',13,30,1);
}*/

// Check triggers existence with handler name
function checkIfTriggerExists(handlerFunction) {
  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;
  triggers.forEach(function (trigger) {
    if(trigger.getHandlerFunction() === handlerFunction)
      triggerExists = true;
  });  
  //Logger.log(triggers[0].getHandlerFunction())
  return triggerExists;
}

/*
// Delete trigger by handler name
function deleteTriggersByName(name){
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++){ 
      if (triggers[i].getHandlerFunction().indexOf(name) != -1) 
      {
        ScriptApp.deleteTrigger(triggers[i]);
      }
  }
}
*/

/*
// Check triggers existence with a event type & handler name
function checkIfTriggerExists(eventType, handlerFunction) {
  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;
  triggers.forEach(function (trigger) {
    if(trigger.getEventType() === eventType &&
      trigger.getHandlerFunction() === handlerFunction)
      triggerExists = true;
  });  
  Logger.log(triggers[0].getHandlerFunction())
  return triggerExists;
}*/
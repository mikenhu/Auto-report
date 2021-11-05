// var DAILY_FILTER = "Daily productivity report";
// var WEEKLY_FILTER = "Weekly productivity report";

/**
 * Create the labels we’ll need for report types
 */
/*
function GmailLabelSetup(name, textColor, backgroundColor) {
  var label = GmailApp.getUserLabelByName(name);
  if (label) return label;

  //var textColor = text; // Please set this.
  //var backgroundColor = background; // Please set this.

  var userId = "me";
  var resource = Gmail.newLabel();
  resource.labelListVisibility = "labelShow";
  resource.messageListVisibility = "show";
  resource.name = name;
  
  var labelColor = Gmail.newLabelColor();
  labelColor.textColor = textColor;
  labelColor.backgroundColor = backgroundColor;
  resource.color = labelColor;
  
  Gmail.Users.Labels.create(resource, userId);
  return GmailApp.getUserLabelByName(name);
}

// Remove Gmail labels
function removeLabel() {
    var labels = [];
    labels = GmailApp.getUserLabels();
    //Loop through all Labels
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].getName().indexOf("Daily Reports") > -1 || labels[i].getName().indexOf("Weekly Reports") > -1)  {
            //If label name is found - delete the label
            labels[i].deleteLabel();
            //Logger.log(labels[i].getName());
        }
    }
}

//
// Creates a filter to put all email from ${toAddress} into
// Gmail label ${labelName}
//
function createToFilter(toAddress, subject, labelName) {

  // Lists all the labels for the user running the script, 'me'
  var labels = Gmail.Users.Labels.list('me')

  // Search through the existing labels for ${labelName}
  var label = null
  labels.labels.forEach(function (l) {
    if (l.name === labelName) {
      label = l
    }
  })

  // If the label doesn't exist, return
  if (label === null) return;

  // Create a new filter object (really just POD)
  var filter = Gmail.newFilter();

  // Make the filter activate when the to address is ${toAddress}
  filter.criteria = Gmail.newFilterCriteria();
  filter.criteria.to = toAddress;
  GmailApp.search("Daily productivity report"

  // Make the filter apply the label id of ${labelName}
  filter.action = Gmail.newFilterAction();
  filter.action.addLabelIds = [label.id];

  // Add the filter to the user's ('me') settings
  Gmail.Users.Settings.Filters.create(filter, 'me');

}


function main () {
  createToFilter(Session.getActiveUser().getEmail(), DAILY_FOLDER);
}
*/
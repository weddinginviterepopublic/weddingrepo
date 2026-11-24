// RSVP receiver for the wedding site.
// Paste into the Google Sheet: Extensions -> Apps Script, then deploy as a
// web app (Execute as: Me, Who has access: Anyone). See README for steps.
// To update an existing deployment without changing its URL:
// Deploy -> Manage deployments -> pencil icon -> Version: New version -> Deploy.

var HEADERS = ["Received", "Name", "Phone or email", "Attending", "Guests", "Events", "Message", "Accommodation", "Tiruppur Reception"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = e.parameter;
    if (!p.name || !p.attending) {
      return reply({ ok: false, error: "Name and attendance are required." });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    } else {
      var top = sheet.getRange(1, 1, 1, HEADERS.length);                      // fill in any column headers added since the sheet was made
      var have = top.getValues()[0];
      if (have.some(function (v, i) { return v === "" && HEADERS[i]; })) {
        top.setValues([have.map(function (v, i) { return v === "" ? HEADERS[i] : v; })]);
      }
    }
    sheet.appendRow([new Date(), p.name, p.contact || "", p.attending, p.guests || "", p.events || "", p.message || "", p.accommodation || "", p.tiruppur || ""]);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

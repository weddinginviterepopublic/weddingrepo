// RSVP receiver for the wedding site.
// Paste into the Google Sheet: Extensions -> Apps Script, then deploy as a
// web app (Execute as: Me, Who has access: Anyone). See README for steps.

var HEADERS = ["Received", "Name", "Phone or email", "Attending", "Guests", "Events", "Message"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = e.parameter;
    if (!p.name || !p.attending) {
      return reply({ ok: false, error: "Name and attendance are required." });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([new Date(), p.name, p.contact || "", p.attending, p.guests || "", p.events || "", p.message || ""]);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

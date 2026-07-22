/**
 * KitchenAxis — Google Sheet lead collector (Apps Script Web App)
 * ---------------------------------------------------------------
 * SETUP
 * 1. Create a Google Sheet (e.g. "KitchenAxis Leads").
 * 2. Extensions → Apps Script. Delete any code, paste this file.
 * 3. (Optional) Set a shared secret: replace SECRET below and put the
 *    same value in GOOGLE_SHEET_TOKEN in your .env.local.
 * 4. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the Web app URL (ends with /exec) into GOOGLE_SHEET_WEBHOOK_URL.
 * 5. Run `setup()` once (from the editor) to write the header row & authorize.
 */

var SECRET = ""; // must match GOOGLE_SHEET_TOKEN (leave "" to disable the check)

var HEADERS = [
  "timestamp", "ref", "name", "phone", "email", "company",
  "service", "city", "urgency", "intent", "preferredDate",
  "message", "source", "locale", "page",
];

function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (SECRET && data.token !== SECRET) {
      return json({ ok: false, error: "unauthorized" });
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) setup();

    var row = HEADERS.map(function (h) {
      return data[h] != null ? data[h] : "";
    });
    sheet.appendRow(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

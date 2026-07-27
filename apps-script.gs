/**
 * CookFi Giveaway — Google Sheets receiver
 * ------------------------------------------------
 * Paste this into a Google Apps Script project bound to the Google Sheet
 * where you want entries to land. See SETUP.md for step-by-step instructions.
 *
 * It creates a header row automatically the first time it runs, and appends
 * one row per giveaway entry after that.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "Invalid JSON" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var headers = [
    "Timestamp (server)",
    "Giveaway",
    "X Handle",
    "Wallet Address",
    "Followed Profile 1",
    "Followed Profile 2",
    "Liked/RT/Commented",
    "Comment Link",
    "Joined Telegram",
    "Submitted At (client)",
    "User Agent"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }

  sheet.appendRow([
    new Date(),
    data.giveaway || "",
    data.xHandle || "",
    data.wallet || "",
    data.followConfirmed1 ? "YES" : "NO",
    data.followConfirmed2 ? "YES" : "NO",
    data.engagementConfirmed ? "YES" : "NO",
    data.commentLink || "",
    data.telegramConfirmed ? "YES" : "NO",
    data.submittedAt || "",
    data.userAgent || ""
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Optional: lets you sanity-check the deployment URL by visiting it in a browser.
function doGet(e) {
  return ContentService.createTextOutput(
    "CookFi giveaway endpoint is live."
  ).setMimeType(ContentService.MimeType.TEXT);
}

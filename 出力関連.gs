// add_valueがJSONである場合、予めJSON.stringfyに掛けておくと、より詳細な内容にまで踏み込める
function output_sheet(value = {}){
  const SSID = property("SSID").value;
  const SSNAME = property("SSNAME").value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);

  message = "[Skip] Not found [Spread-Sheet ID] or [Spread-Sheet Name] or [value(json)].";
  if (SHEET != null) {
    SHEET.appendRow([new Date(), JSON.stringify(value)]);
    message = "[COMPLETE]add data";
  }

  debug("output.gs/output_sheet: " + message);
  return message;
}

function output_api(json) {
  return ContentService
    .createTextOutput(
      JSON.stringify(json)
    )
    .setMimeType(ContentService.MimeType.JSON);
}
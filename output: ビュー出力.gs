// add_valueがJSONである場合、予めJSON.stringfyに掛けておくと、より詳細な内容にまで踏み込める
function __output_sheet(value = {}){
  const SSID = __property("SSID").value;
  const SSNAME = __property("SSNAME").value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);

  message = "[Skip] Not found [Spread-Sheet ID] or [Spread-Sheet Name] or [value(json)].";
  if (SHEET != null) {
    SHEET.appendRow([new Date(), JSON.stringify(value)]);
    message = "[COMPLETE]add data";
  }

  return __debug("output.gs/output_sheet: " + message);
}

function __output_api(json) {
  return ContentService
    .createTextOutput(
      JSON.stringify(json)
    )
    .setMimeType(ContentService.MimeType.JSON);
}

// デバッグ時は有効なリプライトークンが必須なので、グループに送るならheaderにto: グループIDを入れる
/* エラー例
Exception: Request failed for https://api.line.me returned code 400. Truncated server response: {"message":"Invalid reply token"} (use muteHttpExceptions option to examine full response)
---
例外：https：//api.line.meのリクエストが失敗してコード400が返されました。サーバーの応答が切り捨てられました：{"メッセージ"： "無効な応答トークン"}（完全な応答を調べるにはmuteHttpExceptionsオプションを使用してください）
*/
function __output_line(
  message = '【デバッグ】どこかから送信機能を使おうとして失敗した痕跡あり',
  target_id = __property("DEBUG_ID").value,  // 必須
  token = __property("ACCESS_TOKEN").value   // 必須
) {
  let result = false;

  // 初期値が不正でないことを確認しておく
  if(!target_id || !token) return result;

  // 送信エラー時のデバッグのため、オプションを保持する
  const OPTIONS = {
    method: 'post',

    // https://developers.line.biz/console/channel/(ID)/messaging-api のチャネルアクセストークン
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },

    // オウム返しならe.postData.contents.events[0].text.message
    // payloadはJSON Stringでないと送信できないためstringifyが必須
    payload: JSON.stringify({
      messages: [{
        type: 'text',
        text: message,
      }],
      'to': target_id
    })
  }

  // 実行に失敗するケースもありえるのでtry-catchにする
  try {
    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', OPTIONS);
    result = true;
  } catch(e) {
    __output_sheet({error: "send_lineエラー"})
    __output_sheet(OPTIONS)
  }
  return result;
}
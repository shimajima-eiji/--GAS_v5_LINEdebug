function doPost(e) {
  // return doPost_minimum(e)  // 解説のため置いておく

  // 以下、運用のための本スクリプト

  output_sheet(e);  // デバッグのため、入力値をシートに書き出す
  // 引数に必要なデータを検証
  if(e == undefined
    && e.postData == undefined
    && e.postData.contents == undefined
    && typeof e.postData.contents != "String"
  ) return;

  // [TODO] parse処理自体の成功チェックや、parseしたjsonの妥当性検証
  let json = JSON.parse(e.postData.contents).events[0];

  // 処理を実行
  let message = main(json.message.text);

  send_line(message, json.replyToken, json.source.groupId);
}

// デバッグ時は有効なリプライトークンが必須なので、グループに送るならheaderにto: グループIDを入れる
/* エラー例
Exception: Request failed for https://api.line.me returned code 400. Truncated server response: {"message":"Invalid reply token"} (use muteHttpExceptions option to examine full response)
---
例外：https：//api.line.meのリクエストが失敗してコード400が返されました。サーバーの応答が切り捨てられました：{"メッセージ"： "無効な応答トークン"}（完全な応答を調べるにはmuteHttpExceptionsオプションを使用してください）
*/
function send_line(message, reply_token, group_id) {
  const TOKEN = 'Bearer ' + property("ACCESS_TOKEN").value;

  // 引数チェック
  if(typeof message === 'undefined'
  || typeof reply_token === 'undefined'
  || typeof TOKEN === 'undefined'
  ) return;

  // 送信元がトークかグループか判定して、適切な方へ返す
  const TARGET_ENDPOINT = (group_id)
    ? 'push'   // グループ
    : 'reply'  // トーク

  // メッセージを返信
  let headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': TOKEN,
  };
  let payload = {
    'replyToken': reply_token,  // トークの場合必須。グループに送信した場合でも項目は存在する
    'messages': [{
      'type': 'text',
      'text': message,
    }],
    'to': group_id  // group_idが存在しない場合はトークへ、存在する場合は当該グループをgroup_idで指定する
  };

  // 実行に失敗するケースもありえるのでtry-catchにする
  const RESULT = {
    "message": message,
    "result": false,
    "groupId": group_id,
  };
  let options = {
    'headers': headers,
    'method': 'post',
    'payload': JSON.stringify(payload),
  };

  try {
    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/' + TARGET_ENDPOINT, options);
    RESULT.result = true;
  } catch(e) {
    output_sheet({error: "send_lineエラー"})
    output_sheet(options)
  }
  return output_api(JSON.stringify(RESULT));
}
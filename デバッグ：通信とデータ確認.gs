// GASのWebhookのデバッグ用
// 解放すると通信があるたびに動くので、デバッグが終わったらコメントアウトする
function doGet(e) {
  // ここのリプライトークンは意味のないものにしているが、groupには送れる
  // send_message("curlデバッグ: アクセスポイントチェック", 'https://api.line.me/v2/bot/message/push', "リプライトークン");
}

// Lineの送信受け
function doPost(e) {
  let json = JSON.parse(e.postData.contents);

  // 送信元がトークかグループか判定して、適切な方へ返す
  let endpoint = (json.events[0].source.type == 'group')
    ? 'https://api.line.me/v2/bot/message/push'   // グループ
    : 'https://api.line.me/v2/bot/message/reply'  // トーク
  ;
  send_message(JSON.stringify(json), endpoint, json.events[0].replyToken);
}

function send_message(message, endpoint, reply_token) {
  // 引数チェック
  if(typeof message === 'undefined'
  || typeof endpoint === 'undefined'
  || typeof reply_token === 'undefined') return;

  //LINE Developersで取得したアクセストークンを入れる
  const property = PropertiesService.getScriptProperties();

  // メッセージを返信    
  UrlFetchApp.fetch(endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + property.getProperty("channel_access_token"),
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': property.getProperty("group_id"),  // グループの場合必須。トークの場合は無視される
      'replyToken': reply_token,  // トークの場合必須。グループに送信した場合でも項目は存在する
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
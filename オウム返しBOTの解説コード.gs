function doPost_minimum(e) {
  const TOKEN = "(ここは自分で入れる)";  // 実践で使う場合はinitialize()のproperty("ACCESS_TOKEN", "(ここは自分で入れる)")に登録する
  const ENDPOINT_TARGET = "push"      // トークはreply, グループはpush
  // GASでデバッグする場合はグループのみ（トークのリプライトークンが使えないため）

  let json = JSON.parse(e.postData.contents).events[0];

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/' + ENDPOINT_TARGET, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + TOKEN,
    },

    'method': 'post',

    'payload': JSON.stringify({
      'replyToken': json.replyToken,
      'messages': [{
        'type': 'text',
        'text': json.message.text,
      }],
      'to': json.source.groupId  // グループに送信する場合、グループIDが必須。トークの場合は不要ながらあっても問題ない。
    }),
  });
}

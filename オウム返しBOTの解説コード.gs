/**
 * （この形式のコメントは、本来JSDocを書くために使われるが、ここでは受講生向けのコメントとする）
 * 
 * やっていること
 * ユーザーが気にするべき内容を定数にしている
 * - MESSAGE: 本文
 * - TARGET_ID: 
 * - TOKEN: https://developers.line.biz/console/channel/(ID)/messaging-api のチャネルアクセストークン
 * 
 * 送信処理はURLFetchApp.fetchで実行している
 * 第一引数: LINEBOTでメッセージを送信するURL(固定:https://api.line.me/v2/bot/message/push)
 * 第二引数: POSTパラメータを渡して処理する。
 * 
 * 補足
 * - 今回は１メッセージだけを送る想定だが、複数のメッセージを送る事ができる
 * - 別のユーザーにメッセージを送りたい場合は、toが変わるためUrlFetchAppを別途呼び出す必要がある
 */

// 学習用に最小限の構成とする
// eを引数に受けられるが、なくても動くようにデフォルト引数(`e = {}`の部分)としておく
function doPost_minimum(e = {}) {
  // オウム返しをしたい場合は、JSON.parse(e.postData.contents).events[0],text.message
  const MESSAGE = "";
  // オウム返しをしたい場合は、JSON.parse(e.postData.contents).events[0],source.「userId or groupId」
  const TARGET_ID = "";
  const TOKEN = "";

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    // 送信方式をpostに指定(詳細はget)
    'method': 'post',

    // ヘッダーに認証情報を入れる
    // 認証方式にbearer認証が使われている
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + TOKEN,
    },

    // payloadはJSON Stringで送る必要がある
    // toに送信先
    // messages[i].textに本文
    'payload': JSON.stringify({
      "to": TARGET_ID,

      // メッセージは複数同時に送る事ができる
      "messages": [
        {
          "text": MESSAGE,
          "type": "text"
        }
      ]
    }),
  });
}

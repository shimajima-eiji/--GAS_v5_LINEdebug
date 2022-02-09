/*
## 経緯
いつもLINEBotでオウム返しする方法を調べるので、自力でなんとかできるようにコードを整備する。

## 主要リンク
- [リポジトリ](https://github.com/shimajima-eiji/--GAS_v5_LINEdebug)
  - [テンプレート](https://github.com/shimajima-eiji/--GAS_v5_Template)
- [Gdrive:ディレクトリ](https://drive.google.com/drive/my-drive)
- [Gdrive:スクリプト](https://script.google.com/home)
- [Gdrive:スプレッドシート](https://docs.google.com/spreadsheets)
- [LINEBOT:Webhookとチャネルアクセストークン](https://developers.line.biz/console/channel/(チャネルID)/messaging-api)
- [LINEBOT:グループ設定など](https://manager.line.biz/account/(アカウントID)/setting)

## システムバージョン
ver1.1.0

## 制限


## 環境変数
|key|value|用途|備考|
|---|-----|---|----|
|SSID|スプレッドシートID|デバッグ用シート||
|SSNAME|シート名|デバッグ用シート||
|ACCESS_TOKEN|チャネルアクセストークン|動作対象のLINEBOT||
|DEBUG_ID|userId/groupId|デバッグ用アカウント。開発者の個人LINEなど||

## デバッガ
```
function debug_doPost() {
  let e = {
    postData: {
      contents: [
        {test: "test"}
      ]
    }
  }
  doPost(e)
}

function debug_lineview(e) {
  if(e) __output_sheet(e);

  const SSID = __property("SSID").value;
  const SSNAME = __property("SSNAME").value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);
  const data = JSON.parse(SHEET.getRange(SHEET.getLastRow(), 2).getValue())

  // 参考情報
  const json = JSON.parse(
    data.postData.contents
  ).events  // [0].source.(userId or groupId)を取得
  Logger.log(json);

  return data  // デバッグに使い方ので、doPost(e)の引数相当にする
}
```

## パラメータ
### doPost
LINEの標準入力に準拠するが、他の入力にも拡張で対応できる

#### リクエスト
|キー|キー必須|想定される値|概要|
|---|-------|----------|---|

#### レスポンス
レスポンスはJSON String形式

|キー|欠損の可能性|想定される値|概要|
|---|----------|----------|----|

レスポンスは([String] or [JSON String] or [JSONS String])形式

## システム管理情報
| システム名称                 | 情報             |
| -------------------------- | --------------- |
| READMEフォーマットのバージョン | ver1.2022.02.09 |
| README.gs -> README.md     | https://github.com/shimajima-eiji/--GAS_v5_Template/blob/main/.github/workflows/convert_gs2md.yml |
| translate ja -> en         | https://github.com/shimajima-eiji/--GAS_v5_Template/blob/main/.github/workflows/translate_ja2en.yml |

*/
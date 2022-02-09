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

  /* 参考情報
  const json = JSON.parse(
    data.postData.contents
  ).events  // [0].source.(userId or groupId)を取得
  Logger.log(json);
  // */

  return data  // デバッグに使い方ので、doPost(e)の引数相当にする
}

function doPost(e) {
  // return doPost_minimum(e)  // 解説のため置いておく

  // デバッグ用：入力値をシートに書き出す
  if (__property("DEBUG").value == "true") 
    output_sheet(e);

  // 開発用
  e = debug_lineview(e)

  // 引数に必要なデータを検証。POSTで送っている以上、何らかのデータがあるはず
  if(e == undefined
    && e.postData == undefined
    && e.postData.contents == undefined
    && typeof e.postData.contents != "String"
  ) return;

  e = __main_get_line(e);
  let message = __main_create_message(e.message);
  let target = e.target

  return __output_api({result: (__output_line(message, target))});
}


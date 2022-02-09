function doPost(e) {
  // return doPost_minimum(e)  // 解説のため置いておく

  // デバッグ用：入力値をシートに書き出す
  if(__property("DEBUG").value == "true")
    __output_sheet(e);

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

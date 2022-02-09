// LINEから送られている場合の処理
function __main_get_line(e) {
  let json = ""

  // LINEから送られているか判別
  try {
    json = JSON.parse(e.postData.contents)
  } catch(e) {
    return;
  }

  if(json.events.length == 0 && !json.events[0].source)
    return;
  json = json.events[0];

  const DATA = {
    message: json.message.text,
    target: (json.source.userId)
        ? json.source.userId
        : json.source.groupId
  }

  // 必要な情報が入っていればパラメータを抜き出す
  // [TODO]必要に応じてパラメーターを追加していく
  return (DATA.message && DATA.target)
    ? DATA
    : e
}

function __main_create_message(message) {
  return message;
}

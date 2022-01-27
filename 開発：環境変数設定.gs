function debug_flag() {
  if(property("DEBUG").value == "true") {
    property("DEBUG", "false");
  } else {
    property("DEBUG", "true");
  }
}

function debug(message) {
  // propertyからdebugを呼んでいるため、無限ループ回避のため平打ちする
  if(PropertiesService.getScriptProperties().getProperty("DEBUG") == "true") Logger.log(message);
}

// 開発中に間違えて実行すると悲惨なので、強制上書きされないようブロックしておく(1敗)
const GUARD_KEYS = [
  "SSID",
  "SSNAME",
  "ACCESS_TOKEN",
];
/*
function initialize() {
  property("SSID", "", true);          // https://docs.google.com/spreadsheets/d/(ここがSSID)/edit
  property("SSNAME", "", true);        // 上記シート名
  property("ACCESS_TOKEN", "", true);  // https://developers.line.biz/console/channel/(LINEチャネル)/messaging-api?status=success のチャネルアクセストークン（長期）
  property("DEBUG", "false");
}
// */

// get/setに対応
function property(key, value, force_flag=false) {
  let message = 

  // [stop]keyもvalueもない
  (key == undefined && value == undefined) 
  ? "[Stop:環境変数設定.property] Required key(get). Optional value(set)"

  // [get]keyだけの場合
  : (key != undefined && value == undefined)
  ? PropertiesService.getScriptProperties().getProperty(key)

  // [set]keyとvalueが存在する場合で、上書き禁止ではないもの
  : (key != undefined && value != undefined && ! GUARD_KEYS.includes(key))
  ? true
  
  // [set]keyとvalueが存在する場合で、上書き禁止の可能性があるもの
  : (key != undefined && value != undefined && GUARD_KEYS.includes(key) && force_flag)
  ? true

  // [stop]keyがなくてvalueがあるなど、想定外あるいは不正な処理の場合
  : "[Skip] key is protected."
 
  // set時のみ
  result = "Failed";
  if (message === true) {
    PropertiesService.getScriptProperties().setProperty(key, value);
    message = "[Complate:local_set] key:" +key + " / value:" + PropertiesService.getScriptProperties().getProperty(key);
    result = "Success";
  }

  // get時も実行結果としては成功なので別途判定
  if( message == PropertiesService.getScriptProperties().getProperty(key) ) {
    result = "Success";
  }

  // 入力したプロパティが表示されればOK
  debug("開発：環境変数設定.gs/property: " + message);
  return {
    result: result,
    value: message
  };
}
// 新エディタで作成する場合、GUIでプロパティを追加できないらしく不便なので、開発専用の関数を用意した。
// 他プロジェクトでも使いまわそう。
function initialize() {
  local_set("channel_access_token", "(your access token)")
  local_set("group_id", "(your group id)");
}

function local_set(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);

  // 入力したプロパティが表示されればOK
  Logger.log("[Complate:local_set] key:" +key + " / value:" + PropertiesService.getScriptProperties().getProperty(key));
}
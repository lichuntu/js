/******************************
脚本名称：WorkBuddy 存储检查
作者：lichun
Platform : Quantumult X
*******************************/
const KEY = "workbuddy_auth";
const t = $prefs.valueForKey(KEY);
const u = $prefs.valueForKey(KEY + "_uid");
const d = $prefs.valueForKey(KEY + "_domain");
const e = $prefs.valueForKey(KEY + "_ent");

$notify(
  "WorkBuddy 存储检查",
  "token: " + (t ? t.length + " 字" : "【空】"),
  "uid: " + (u || "【空】") + "\ndomain: " + (d || "【空】") + "\nent: " + (e || "【空】")
);
$done({});

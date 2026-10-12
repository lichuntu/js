/******************************
脚本名称：WorkBuddy 存储检查
Version  : v2.1.0
作者：lichun
Platform : Quantumult X
*******************************/
const NAME = "WorkBuddy 存储检查";
const KEY  = "workbuddy_auth";

const t = $prefs.valueForKey(KEY);
const u = $prefs.valueForKey(KEY + "_uid");
const d = $prefs.valueForKey(KEY + "_domain");
const e = $prefs.valueForKey(KEY + "_ent");

// 全部塞进正文，避免副标题被截
const msg =
  "token: " + (t ? t.length + " 字" : "【空】") + "\n" +
  "token头: " + (t ? t.slice(0, 28) + "..." : "【空】") + "\n" +
  "uid: " + (u || "【空】") + "\n" +
  "domain: " + (d || "【空】") + "\n" +
  "ent: " + (e || "【空】");

$notify(NAME, t ? "有 token" : "无 token", msg);
$done({});

/******************************
脚本名称：WorkBuddy 抓取 token
Version  : v1.0.3
作者：lichun
Platform : Quantumult X
*******************************/
const NAME = "WorkBuddy-Auth";
const KEY  = "workbuddy_auth";

const url     = $request.url || "";
const headers = $request.headers || {};

function pick(h, names) {
  const keys = Object.keys(h || {});
  for (const n of names) {
    const hit = keys.find(k => k.toLowerCase() === n.toLowerCase());
    if (hit && h[hit]) return h[hit];
  }
  return "";
}

if (/(codebuddy\.cn|workbuddy\.cn|workbuddy\.ai)/.test(url)) {
  const auth = pick(headers, ["Authorization"]);
  if (auth && /^Bearer\s+/i.test(auth)) {
    const bare = auth.replace(/^Bearer\s+/i, "");
    // 无条件写，不做任何去重
    $prefs.setValueForKey(bare, KEY);
    const uid = pick(headers, ["X-User-Id"]);
    const dom = pick(headers, ["X-Domain"]);
    const ent = pick(headers, ["X-Enterprise-Id"]);
    if (uid) $prefs.setValueForKey(uid, KEY + "_uid");
    if (dom) $prefs.setValueForKey(dom, KEY + "_domain");
    if (ent) $prefs.setValueForKey(ent, KEY + "_ent");
    $notify(NAME, "已存 token(" + bare.length + "字)", "uid=" + (uid || "-"));
  }
}
$done({});

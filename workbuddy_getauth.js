/******************************
脚本名称：WorkBuddy 抓取 token
Version  : v1.0.0
作者：lichun
Platform : Quantumult X
脚本功能：抓取运行时明文 access_token 存入本地
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
    const old  = $prefs.valueForKey(KEY);
    $prefs.setValueForKey(bare, KEY);
    $prefs.setValueForKey(pick(headers, ["X-User-Id"]) || "", KEY + "_uid");
    $prefs.setValueForKey(pick(headers, ["X-Domain"]) || "", KEY + "_domain");
    $prefs.setValueForKey(pick(headers, ["X-Enterprise-Id"]) || "", KEY + "_ent");
    if (old !== bare) {
      $notify(NAME, "✅ 抓到明文 token", url.replace(/^https?:\/\//, "").slice(0, 40));
    }
  }
}
$done({});

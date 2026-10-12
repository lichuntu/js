// WorkBuddy 抓取运行时明文 access_token → 存入 QX 本地存储
const NAME = "WorkBuddy-Auth";
const KEY  = "workbuddy_auth";

const url     = $request.url || "";
const headers = $request.headers || {};

// 大小写无关取 header
function pick(h, names) {
  const keys = Object.keys(h || {});
  for (const n of names) {
    const hit = keys.find(k => k.toLowerCase() === n.toLowerCase());
    if (hit && h[hit]) return h[hit];
  }
  return "";
}

// 只认 codebuddy / workbuddy 相关域
if (/(codebuddy\.cn|workbuddy\.cn|workbuddy\.ai)/.test(url)) {
  const auth = pick(headers, ["Authorization"]);
  if (auth && /^Bearer\s+/i.test(auth)) {
    const bare = auth.replace(/^Bearer\s+/i, "");
    const old  = $prefs.valueForKey(KEY);

    $prefs.setValueForKey(bare, KEY);
    $prefs.setValueForKey(pick(headers, ["X-User-Id"]) || "", KEY + "_uid");
    $prefs.setValueForKey(pick(headers, ["X-Domain"]) || "", KEY + "_domain");
    $prefs.setValueForKey(pick(headers, ["X-Enterprise-Id"]) || "", KEY + "_ent");
    $prefs.setValueForKey(url, KEY + "_lasturl");

    // token 变了才提示，避免刷屏
    if (old !== bare) {
      $notify(NAME, "✅ 抓到明文 token",
              "来源: " + url.replace(/^https?:\/\//, "").slice(0, 40));
    }
  }
}
$done({});

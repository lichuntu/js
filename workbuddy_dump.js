/******************************
脚本名称：WorkBuddy 存储检查（直连版）
Version  : v2.0.0
作者：lichun
Platform : Quantumult X
脚本功能：读取本地存储的 token 并直连签到接口验证可用性
*******************************/
const NAME = "WorkBuddy 存储检查";
const KEY  = "workbuddy_auth";

// 直连的接口（和签到脚本保持一致，按实际可达域名）
const API_BASES   = ["https://www.workbuddy.cn", "https://www.codebuddy.cn"];
const STATUS_PATH = "/v2/billing/meter/checkin-activity-status";
const UA          = "WorkBuddy-Checkin/2.2.0";

!(async () => {
  const token  = $prefs.valueForKey(KEY);
  const uid    = $prefs.valueForKey(KEY + "_uid") || "";
  const domain = $prefs.valueForKey(KEY + "_domain") || "www.workbuddy.cn";
  const ent    = $prefs.valueForKey(KEY + "_ent") || "";

  const basic =
    "token: " + (token ? token.length + " 字" : "【空】") +
    "\nuid: " + (uid || "【空】") +
    "\ndomain: " + (domain || "【空】") +
    "\nent: " + (ent || "【空】");

  if (!token) {
    $notify(NAME, "本地无 token", basic);
    return;
  }

  // 直连签到接口，验证 token 可用性
  const headers = {
    "Authorization": "Bearer " + token,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": UA,
    "X-Domain": domain
  };
  if (uid) headers["X-User-Id"] = uid;
  if (ent) { headers["X-Enterprise-Id"] = ent; headers["X-Tenant-Id"] = ent; }

  async function probe(base) {
    try {
      const res = await $task.fetch({
        url: base + STATUS_PATH, method: "POST", headers: headers, body: "{}"
      });
      return { base: base, status: res.statusCode, body: (res.body || "").slice(0, 160) };
    } catch (e) {
      return { base: base, status: 0, body: "ERR " + String(e).slice(0, 80) };
    }
  }

  let line = "";
  for (const b of API_BASES) {
    const r = await probe(b);
    line += b.replace("https://", "") + " → HTTP " + r.status + "\n";
    if (r.status && r.status !== 404 && r.status !== 502) {
      line += "  " + r.body + "\n";
      break;
    }
  }

  $notify(NAME, "直连测试完成", basic + "\n\n" + line);
  console.log(NAME, basic, line);
})();

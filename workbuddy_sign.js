/******************************
脚本名称：WorkBuddy 自动签到
Version  : v1.0.0
作者：lichun
Platform : Quantumult X
脚本功能：读取 token 自动签到
*******************************/
const NAME = "WorkBuddy-Sign";
const KEY  = "workbuddy_auth";

const API_BASE    = "https://www.codebuddy.cn";
const STATUS_PATH = "/v2/billing/meter/checkin-activity-status";
const CLAIM_PATH  = "/v2/billing/meter/daily-checkin";
const UA          = "WorkBuddy-Checkin/2.2.0";

!(async () => {
  const token = $prefs.valueForKey(KEY);
  if (!token) { $notify(NAME, "尚无凭证", "请打开 WorkBuddy 触发抓取"); return; }
  const uid    = $prefs.valueForKey(KEY + "_uid") || "";
  const domain = $prefs.valueForKey(KEY + "_domain") || "www.workbuddy.cn";
  const ent    = $prefs.valueForKey(KEY + "_ent") || "";

  function buildHeaders() {
    const h = {
      "Authorization": "Bearer " + token,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "User-Agent": UA,
      "X-Domain": domain
    };
    if (uid) h["X-User-Id"] = uid;
    if (ent) { h["X-Enterprise-Id"] = ent; h["X-Tenant-Id"] = ent; }
    return h;
  }

  async function post(path) {
    const res = await $task.fetch({ url: API_BASE + path, method: "POST", headers: buildHeaders(), body: "{}" });
    let data; try { data = JSON.parse(res.body); } catch (e) { data = {}; }
    return { status: res.statusCode, data };
  }

  try {
    const st = await post(STATUS_PATH);
    if (st.status === 401 || st.status === 403) { $notify(NAME, "⚠️ 凭证失效", "重开 WorkBuddy 触发抓取"); return; }
    const raw = JSON.stringify(st.data || {});
    const d = (st.data && st.data.data) ? st.data.data : (st.data || {});
    const done = d.checkedIn === true || d.checkin === true || d.todayChecked === true || /已签|already/i.test(raw);
    if (done) { $notify(NAME, "ℹ️ 今日已签到", raw.slice(0, 120)); return; }

    const cl = await post(CLAIM_PATH);
    if (cl.status === 401 || cl.status === 403) { $notify(NAME, "⚠️ 凭证失效", "重开 WorkBuddy 触发抓取"); return; }
    if (cl.status === 200 && cl.data && cl.data.success !== false) {
      const cd = (cl.data.data) ? cl.data.data : cl.data;
      $notify(NAME, "✅ 签到成功", JSON.stringify(cd).slice(0, 120));
    } else {
      $notify(NAME, "⚠️ 返回异常", "HTTP " + cl.status + " " + raw.slice(0, 100));
    }
    console.log(NAME, JSON.stringify(cl.data));
  } catch (e) {
    $notify(NAME, "❌ 请求异常", String(e));
  }
})();

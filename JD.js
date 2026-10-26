/*
 * 京东 App 净化脚本 (基于真机抓包)
 * 抓包版本: JD 16.0.70 (build 171012)
 * 抓包时间: 2026-10-26
 *
 * 已实现:
 *   1. 底栏去掉「逛」(find) tab   —— 真机抓包验证结构
 *
 * 待验证: 「我的」页去游戏中心（当前抓包未捕获该接口）
 */

const jdUrl = (typeof $request !== "undefined" && $request && $request.url) || "";

// 底栏要隐藏的 functionId
const HIDE_TABS = ["find"];

function isObj(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * readCustomSurfaceList: 底栏(tabbar)配置
 * result.navigationOrder       = "index,find,messagenew,cart,home"
 * result.modeMap.normal.navigationAll = [{functionId:"index"...},...]
 * result.modeMap.dark.navigationAll   = 同上(深色模式)
 * 三处都要改，漏一处会不一致
 */
function stripTabs(obj) {
  const r = obj && obj.result;
  if (!isObj(r)) return false;
  let changed = false;

  // 1) navigationOrder 顺序串
  if (typeof r.navigationOrder === "string" && r.navigationOrder) {
    const parts = r.navigationOrder.split(",").map(s => s.trim())
      .filter(s => s && HIDE_TABS.indexOf(s) < 0);
    const joined = parts.join(",");
    if (joined !== r.navigationOrder) {
      r.navigationOrder = joined;
      changed = true;
    }
  }

  // 2) normal / dark 两套 navigationAll
  ["normal", "dark"].forEach(mode => {
    const mm = isObj(r.modeMap) ? r.modeMap[mode] : null;
    if (!isObj(mm) || !Array.isArray(mm.navigationAll)) return;
    const kept = mm.navigationAll.filter(t => !(isObj(t) && HIDE_TABS.indexOf(t.functionId) >= 0));
    if (kept.length !== mm.navigationAll.length) {
      mm.navigationAll = kept;
      changed = true;
    }
  });

  return changed;
}

(function () {
  const body = typeof $response !== "undefined" && $response ? $response.body : "";
  if (typeof body !== "string" || !body) {
    $done({});
    return;
  }

  let obj;
  try {
    obj = JSON.parse(body);
  } catch (e) {
    $done({});
    return;
  }

  let changed = false;
  try {
    if (/functionId=readCustomSurfaceList/.test(jdUrl)) {
      changed = stripTabs(obj);
    }
  } catch (e) {
    changed = false;
  }

  if (changed) $done({ body: JSON.stringify(obj) });
  else $done({});
})();

/*
 * Quantumult X 响应体重写脚本（学习模板）
 * 作用：把响应体里的 data.sex 改成 "2"
 * 仅限自有 / 已授权测试环境使用
 *
 * 目标接口：POST https://ksbapi.jxedt.com/user/userInfo/get
 *
 * 配套 QX 配置，写进你的 rewrite_local 和 mitm：
 *
 * [rewrite_local]
 * ^https?:\/\/ksbapi\.jxedt\.com\/user\/userInfo\/get url script-response-body qx_sex_rewrite.js
 *
 * [mitm]
 * hostname = ksbapi.jxedt.com
 *
 * 提示：正则里的 \. 是转义的 . ，\/ 是转义的 / ，写错一个字符都不生效。
 * 只改 UI 显示字段，别碰任何鉴权/付费相关字段。
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    if (obj && obj.data && obj.data.sex !== undefined) {
        // 原始值是字符串，这里也保持字符串，别写成数字 2
        obj.data.sex = "2";
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("[sex-rewrite] JSON parse failed: " + e);
    $done({ body: body });
}

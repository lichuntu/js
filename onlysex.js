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

let body = $response.body;

try {
    let obj = JSON.parse(body);
    if (obj && obj.data) {
        if (obj.data.sex !== undefined) {
            // 原始值是字符串，这里也保持字符串，别写成数字 2
            obj.data.sex = "1";
        }
        if (obj.data.public_uid !== undefined) {
            // public_uid 也是字符串，保持类型一致
            obj.data.public_uid = "88888888";
        }
        if (obj.data.vip_type !== undefined) {
            // vip_type 也是字符串，保持类型一致
            obj.data.vip_type = "1";
        }
        if (obj.data.show_paper_cover !== undefined) {
            // show_paper_cover 也是字符串，保持类型一致
            obj.data.show_paper_cover = "1";
        }
        if (obj.data.is_show_ad !== undefined) {
            // is_show_ad 也是字符串，保持类型一致
            obj.data.is_show_ad = "0";
        }
        if (obj.data.alert_title !== undefined) {
            // alert_title 也是字符串，保持类型一致
            obj.data.alert_title = "高贵用户";
        }
        if (obj.data.vip_level !== undefined) {
            // vip_level 也是字符串，保持类型一致
            obj.data.vip_level = "1";
        }
        if (obj.data.vip_expiration_time !== undefined) {
            // vip_expiration_time 也是字符串，保持类型一致
            obj.data.vip_expiration_time = "9999.99.99";
        }
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("[sex-rewrite] JSON parse failed: " + e);
    $done({ body: body });
}

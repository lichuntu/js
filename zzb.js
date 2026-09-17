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
            // vip_expiration_time 也是字符串，保持类型一致，且必须是可解析的日期
            obj.data.vip_expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.expiration_time !== undefined) {
            // expiration_time 也是字符串，保持类型一致，且必须是可解析的日期
            obj.data.expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.yst_vip_type !== undefined) {
            // yst_vip_type 也是字符串，保持类型一致
            obj.data.yst_vip_type = "1";
        }
        if (obj.data.yst_vip_expiration_time !== undefined) {
            // yst_vip_expiration_time 也是字符串，保持类型一致，且必须是可解析的日期
            obj.data.yst_vip_expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.user_type !== undefined) {
            // user_type 也是字符串，保持类型一致
            obj.data.user_type = "1";
        }
        if (obj.data.rest_exam_count !== undefined) {
            // rest_exam_count 也是字符串，保持类型一致
            obj.data.rest_exam_count = "9999";
        }
        if (obj.data.remove_error_limit !== undefined) {
            // remove_error_limit 也是字符串，保持类型一致
            obj.data.remove_error_limit = "9999";
        }
        if (obj.data.vip_config && obj.data.vip_config.alert_title !== undefined) {
            // vip_config 里的 alert_title 也是字符串，保持类型一致
            obj.data.vip_config.alert_title = "高贵用户";
        }
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("[sex-rewrite] JSON parse failed: " + e);
    $done({ body: body });
}

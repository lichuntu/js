/******************************
脚本名称：
Version  : v1.0.0
更新时间：2099.99.99
作者：lichun
Platform : Quantumult X
脚本功能：非常神秘
使用说明：添加到重写


[rewrite_local]
^https?:\/\/ksbapi\.jxedt\.com\/user\/userInfo\/get
 url script-response-body https://raw.githubusercontent.com/lichuntu/js/main/lc.js

[MITM]
hostname = ksbapi.jxedt.com




*******************************/
let body = $response.body;

try {
    let obj = JSON.parse(body);
    if (obj && obj.data) {
        if (obj.data.sex !== undefined) {
            // sex 为性别
            obj.data.sex = "1";
        }
        if (obj.data.public_uid !== undefined) {
            // public_uid 为公开用户ID
            obj.data.public_uid = "88888888";
        }
        if (obj.data.nickname !== undefined) {
            // nickname 为昵称
            obj.data.nickname = "李春";
        }
        if (obj.data.vip_type !== undefined) {
            // vip_type 为会员类型
            obj.data.vip_type = "1";
        }
        if (obj.data.show_paper_cover !== undefined) {
            // show_paper_cover 为是否显示试卷封面
            obj.data.show_paper_cover = "1";
        }
        if (obj.data.is_show_ad !== undefined) {
            // is_show_ad 为是否显示广告
            obj.data.is_show_ad = "0";
        }
        if (obj.data.alert_title !== undefined) {
            // alert_title 为提示标题
            obj.data.alert_title = "高贵用户";
        }
        if (obj.data.vip_level !== undefined) {
            // vip_level 为会员等级
            obj.data.vip_level = "1";
        }
        if (obj.data.vip_expiration_time !== undefined) {
            // vip_expiration_time 为会员到期时间
            obj.data.vip_expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.expiration_time !== undefined) {
            // expiration_time 为到期时间
            obj.data.expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.yst_vip_type !== undefined) {
            // yst_vip_type 为云课堂会员类型
            obj.data.yst_vip_type = "1";
        }
        if (obj.data.yst_vip_expiration_time !== undefined) {
            // yst_vip_expiration_time 为云课堂会员到期时间
            obj.data.yst_vip_expiration_time = "2099-12-31 23:59:59";
        }
        if (obj.data.user_type !== undefined) {
            // user_type 为用户类型
            obj.data.user_type = "1";
        }
        if (obj.data.rest_exam_count !== undefined) {
            // rest_exam_count 为剩余考试次数
            obj.data.rest_exam_count = "9999";
        }
        if (obj.data.auto_analysis_package !== undefined) {
            // auto_analysis_package 为自动解析包次数
            obj.data.auto_analysis_package = "99";
        }
        if (obj.data.remove_error_limit !== undefined) {
            // remove_error_limit 为错题移除次数
            obj.data.remove_error_limit = "99";
        }
        if (obj.data.vip_config && obj.data.vip_config.alert_title !== undefined) {
            // vip_config.alert_title 为会员配置里的提示标题
            obj.data.vip_config.alert_title = "高贵用户";
        }
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("[sex-rewrite] JSON parse failed: " + e);
    $done({ body: body });
}

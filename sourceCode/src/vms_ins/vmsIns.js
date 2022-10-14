const MVMS = require('models/vmsManage');

// 봉사시간 갱신신청

exports.vmsInsApply = async (ctx) => {
    // 봉사시간 갱신 신청
    var data = await MVMS.newApply(ctx.request.body);
    ctx.response.body = data;
};

exports.vmsCount = async (ctx) => {
    // 봉사시간 db 카운트
    var data = await MVMS.getCount();
    ctx.response.body = data;
};

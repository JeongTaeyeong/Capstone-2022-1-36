const MBlood = require('models/bloodManage');

// 헌혈 갱신신청

exports.bloodInsApply = async (ctx) => {
    // 헌혈 갱신 신청
    var data = await MBlood.newApply(ctx.request.body);
    ctx.response.body = data;
};

exports.bloodCount = async (ctx) => {
    // 헌혈 db 카운트
    var data = await MBlood.getCount();
    ctx.response.body = data;
};

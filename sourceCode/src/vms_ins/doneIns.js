const MDone = require('models/doneManage');

// 기부액 갱신신청

exports.doneInsApply = async (ctx) => {
    // 기부액 갱신 신청
    var data = await MDone.newApply(ctx.request.body);
    ctx.response.body = data;
};

exports.doneCount = async (ctx) => {
    // 기부액 db 카운트
    var data = await MDone.getCount();
    ctx.response.body = data;
};

const NM = require('models/nftManage')

exports.getcount = async(ctx)=>{
    ctx.body = await NM.getCount();
}

exports.nftInsApply = async (ctx) => {
    // 봉사시간 갱신 신청
    var data = await NM.newApply(ctx.request.body);
    ctx.response.body = data;
};
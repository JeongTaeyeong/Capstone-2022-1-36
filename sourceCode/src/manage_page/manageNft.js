const MNFT = require('models/nftManage');
const PA = require('models/Progressed_achieve')
const APL = require('models/AchieveProgressLev');

// 봉사시간 갱신 신청 관리nftList

exports.viewNftApply = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    var data = await MNFT.viewApply();
    ctx.response.body = data;
};

exports.allowNftApply = async (ctx) => {
    // 봉사시간 갱신 신청 수락
    var data = ctx.request.body;
    console.log(data);
    await MNFT.allowApply({index:data.index,nftNum:data.nftNum});
    await PA.AddProgAchieve(data.nickname, data.nftNum, data.nftName, data.date);
    await APL.AchieveCount(data.nickname);
    ctx.response.body = data;
};

exports.denyNftApply = async (ctx) => {
    // 봉사시간 갱신 신청 거부
    var data = ctx.request.body;
    await MNFT.denyApply(data.index);
    ctx.response.body = data;
};

exports.nowNft = async(ctx)=>{
    var data = ctx.request.body;
    ctx.response.body = await PA.findAchieveArray(data.nickname);
}
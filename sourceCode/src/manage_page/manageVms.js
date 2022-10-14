const MVMS = require('models/vmsManage');
const APL = require('models/AchieveProgressLev');
const PA = require('models/Progressed_achieve');
const NM = require('models/nftManage');

// 봉사시간 갱신 신청 관리

exports.viewVmsApply = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    var data = await MVMS.viewApply();
    ctx.response.body = data;
};

exports.allowVmsApply = async (ctx) => {
    // 봉사시간 갱신 신청 수락
    var data = ctx.request.body;
    var vs = await APL.findVolTime(data.nickname);
    await MVMS.allowApply({index:data.index,volTime:data.volTime});
    await APL.VolTimeUpdate(data.nickname, data.volTime);
    if(vs.volTime<50&&data.volTime>=50){
        var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:0,nftName:"vol_50",nickname:data.nickname,username:"auto"});
    }
    if(vs.volTime<100&&data.volTime>=100){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:1,nftName:"vol_100",nickname:data.nickname,username:"auto"});
    }
    if(vs.volTime<500&&data.volTime>=500){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:2,nftName:"vol_500",nickname:data.nickname,username:"auto"});
    }
    if(vs.volTime<1000&&data.volTime>=1000){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:3,nftName:"vol_1000",nickname:data.nickname,username:"auto"});
    }
    ctx.response.body = data;
};

exports.denyVmsApply = async (ctx) => {
    // 봉사시간 갱신 신청 거부
    var data = ctx.request.body;
    await MVMS.denyApply(data.index);
    ctx.response.body = data;
};

exports.nowVms = async(ctx)=>{
    var data = ctx.request.body;
    ctx.response.body = await APL.findVolTime(data.nickname);
}
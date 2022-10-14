const MBld = require('models/bloodManage');
const APL = require('models/AchieveProgressLev');
const PA = require('models/Progressed_achieve');
const NM = require('models/nftManage');

// 봉사시간 갱신 신청 관리issList

exports.viewBldApply = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    var data = await MBld.viewApply();
    ctx.response.body = data;
};

exports.allowBldApply = async (ctx) => {
    // 봉사시간 갱신 신청 수락
    var data = ctx.request.body;
    var bl =  await APL.findBloodNum(data.nickname);
    console.log(data);
    await MBld.allowApply({index:data.index,issNum:data.issNum});
    await APL.BloodUpdate(data.nickname, data.issNum);

    ctx.response.body = data;
    if(bl.bloodNum == 9){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:10,nftName:"blood_10",nickname:data.nickname,username:"auto"});

    }
    if(bl.bloodNum == 49){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:11,nftName:"blood_50",nickname:data.nickname,username:"auto"});
    }
    if(bl.bloodNum == 99){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:12,nftName:"blood_100",nickname:data.nickname,username:"auto"});
    }
};

exports.denyBldApply = async (ctx) => {
    // 봉사시간 갱신 신청 거부
    var data = ctx.request.body;
    await MBld.denyApply(data.index);
    ctx.response.body = data;
};

exports.nowBld = async(ctx)=>{
    var data = ctx.request.body;
    ctx.response.body = await APL.findBloodNum(data.email);

    
}
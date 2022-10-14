const MDone = require('models/doneManage');
const APL = require('models/AchieveProgressLev');
const PA = require('models/Progressed_achieve');
const NM = require('models/nftManage');

// 봉사시간 갱신 신청 관리

exports.viewDoneApply = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    var data = await MDone.viewApply();
    ctx.response.body = data;
};

exports.allowDoneApply = async (ctx) => {
    // 봉사시간 갱신 신청 수락
    var data = ctx.request.body;
    var don = await APL.findDoneNum(data.nickname);
    await MDone.allowApply({index:data.index,doneNum:data.doneNum});
    await APL.DoneUpdate(data.nickname, data.doneNum);
    ctx.response.body = data;
    console.log(don);
    if(don.doneNum<100000&&data.doneNum+don.doneNum>=100000){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:4,nftName:"don_100k",nickname:data.nickname,username:"auto"});
    }
    if(don.doneNum<1000000&&data.doneNum+don.doneNum>=1000000){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:5,nftName:"don_1m",nickname:data.nickname,username:"auto"});
    }
    if(don.doneNum<10000000&&data.doneNum+don.doneNum>=10000000){
                var num = await NM.getCount();
        await NM.newApply({index:num, nftNum:6,nftName:"don_10m",nickname:data.nickname,username:"auto"});
    }
};

exports.denyDoneApply = async (ctx) => {
    // 봉사시간 갱신 신청 거부
    var data = ctx.request.body;
    await MDone.denyApply(data.index);
    ctx.response.body = data;
};

exports.nowDone = async(ctx)=>{
    var data = ctx.request.body;
    ctx.response.body = await APL.findDoneNum(data.nickname);
}
const MISS = require('models/issManage');
const Account = require('models/Account');
const Ins_Account = require('models/Ins_Account');

// 봉사시간 갱신 신청 관리issList

exports.viewIssApply = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    var data = await MISS.viewApply();
    ctx.response.body = data;
};

exports.allowIssApply = async (ctx) => {
    // 봉사시간 갱신 신청 수락
    var data = ctx.request.body;
    console.log(data);
    await MISS.allowApply({index:data.index,issNum:data.issNum});
    if(data.nickname==data.username){
        await Ins_Account.AddIssAchieve(data.username, data.issNum);
    }
    else{
        await Account.AddIssAchieve(data.nickname, data.issNum);
    }
    ctx.response.body = data;
};

exports.denyIssApply = async (ctx) => {
    // 봉사시간 갱신 신청 거부
    var data = ctx.request.body;
    await MISS.denyApply(data.index);
    ctx.response.body = data;
};

exports.nowIss = async(ctx)=>{
    var data = ctx.request.body;
    if(data.nickname==data.username){
        ctx.body = await Ins_Account.findIssList(data.email);
    }
    else{
        
    ctx.response.body = await Account.findIssList(data.email);
        console.log(ctx.response.body);
    }
}
const Account = require('models/Account');
const Ins_Account = require('models/Ins_Account');

exports.viewIssNft = async (ctx) => {
    // 봉사시간 갱신 신청 확인
    const { user } = ctx.request;

    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }
    if(user.profile.username==user.nickname){
        ctx.body = await Ins_Account.findIssList(user.email);
    }
    else{
    ctx.body = await Account.findIssList(user.email);
    }
    console.log(ctx.body);
};
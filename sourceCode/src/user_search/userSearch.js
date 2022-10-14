const Account = require('models/Account');

// 랭킹 정보를 db에서 가져오기 위해서, find/sort쿼리 사용 필요, 그 후, username과 달성 정도만 쿼리로 가져오기

exports.viewUserList = async (ctx) => {
    // 업적 랭킹 불러오기
    var data = await Account.userSearch();
    ctx.response.body = data;
};

exports.fineUserList = async (ctx) => {
    // 업적 랭킹 불러오기
    var data = await Account.findByUsername(ctx.request.body.username);
    ctx.response.body = data;
};

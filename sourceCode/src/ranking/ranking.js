const APL = require('models/AchieveProgressLev');
const Account = require('models/Account');

// 랭킹 정보를 db에서 가져오기 위해서, find/sort쿼리 사용 필요, 그 후, username과 달성 정도만 쿼리로 가져오기

exports.achieveRankInfo = async (ctx) => {
    // 업적 랭킹 불러오기
    var data = await APL.printAchieveRank();
    ctx.response.body = data;
};

exports.volRankInfo = async (ctx) => {
    // 봉사시간 랭킹 불러오기
    var data = await APL.printVolRank();
    ctx.response.body = data;
};

exports.doneRankInfo = async (ctx) => {
    // 기부액 랭킹 불러오기
    var data = await APL.printDoneRank();
    ctx.body = data;
};

exports.bloodRankInfo = async (ctx) => {
    // 기부액 랭킹 불러오기
    var data = await APL.printBDRank();
    ctx.body = data;
};

exports.nftRankInfo = async (ctx) => {
    // nft 랭킹 불러오기
    var data = await Account.printNftRank();
    ctx.body = data;
};
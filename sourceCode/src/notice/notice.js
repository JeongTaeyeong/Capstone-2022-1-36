const notice = require('models/noticeBoard');

// 공지사항

exports.viewNotice = async (ctx) => {
    // 업적 랭킹 불러오기
    const { ran } = ctx.params;
    console.log(ran);
    
    var data = await notice.viewNotice(ran);
    console.log(data);
    ctx.response.body = data;
};

exports.viewNoticeMust = async (ctx) => {
    // 봉사시간 랭킹 불러오기
    var data = await notice.viewMustRead();
    ctx.response.body = data;
};

exports.findNotice = async (ctx) => {
    // 봉사시간 랭킹 불러오기
    const { index } = ctx.params;
    var data = await notice.viewOneNotice(index);
    ctx.response.body = data;
};

exports.writeNotice = async (ctx) => {
    // 봉사시간 랭킹 불러오기
    var notices = ctx.request.body;
    var num = await notice.getCount();
    notices.index = num;
    var data = await notice.writeNotice(notices);
    ctx.response.body = data;
};

exports.getCount = async(ctx)=>{
    ctx.response.body = await notice.getCount();
}
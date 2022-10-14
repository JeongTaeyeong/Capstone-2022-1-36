const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const noticeBoard = new Schema({ // 공지사항 DB
    index: Number, // 글번호
    title: String, // 게시글 제목
    date: String, // 작성시간
    mustRead: Boolean, // 필독여부
    word: String, // 내용
});

noticeBoard.statics.writeNotice = function({title,date,word,index}){
    // 필독 공지사항 불러오기
    console.log({title,date,word,index})
    const notice = new this({title,date,word,index});
    console.log(notice);
    return notice.save();
};

noticeBoard.statics.viewMustRead = function(){
    // 필독 공지사항 불러오기
    return this.find({"mustRead": true},{"index":true,"title":true,"date":true}).sort({index:1}).exec();
};

noticeBoard.statics.viewNotice = function(ran){
    // 전체 공지사항 불러오기
    return this.find({$and: [{"index": {"$gte": ran*10-10}},{"index": {"$lt": ran*10}}]},{"index":true,"title":true,"date":true}).sort({index:1}).exec();
};

noticeBoard.statics.viewOneNotice = function(index){
    // 전체 공지사항 불러오기
    return this.findOne({index}).exec();
};

noticeBoard.statics.getCount = function(){
    return this.count();
}

module.exports = mongoose.model('noticeBoard', noticeBoard);
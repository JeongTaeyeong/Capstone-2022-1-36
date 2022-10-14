const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const issManage = new Schema({ // 발급권한 신청 관리 DB
    index: Number, // 신청 번호
    nickname: String, // 신청자 닉네임
    issIss: String, // 해당기관 인증서
    issNum: Number, // 신청 업적
    issName: String,
    state: {type: String, default: "대기"}, // 신청 상태(대기, 수락, 거부)
    username: String // 신청자 이름
});

issManage.statics.newApply = function({index,issNum,issName,issIss,nickname,username}){ // 신청 문서 생성
    const user = new this({index,issNum,issName,issIss,nickname,username});
    console.log(user);
    return user.save();
};

issManage.statics.allowApply = function({index,issNum}){
    this.updateOne({index},{$set: {state: "수락"}}).exec();
};

issManage.statics.denyApply = function(index){
    this.updateOne({index},{$set: {state: "거부"}}).exec();
};

issManage.statics.viewApply = function(index){
    return this.find({"state": "대기"}).sort({index:1}).exec();
};

issManage.statics.getCount = function(){
    return this.count();
}

module.exports = mongoose.model('issManage', issManage);
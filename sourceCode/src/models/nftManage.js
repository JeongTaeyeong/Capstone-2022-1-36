const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const nftManage = new Schema({ // 발급권한 신청 관리 DB
    index: Number, // 신청 번호
    nickname: [String], // 수여자 닉네임
    nftIss: String, // 달성 증빙서류
    nftNum: Number, // 신청 업적
    nftName: String,
    state: {type: String, default: "대기"}, // 신청 상태(대기, 수락, 거부)
    username: String // 발급자 이름
});

nftManage.statics.newApply = function({index,nftNum,nftName,nftIss,nickname,username}){ // 신청 문서 생성
    const user = new this({index,nftNum,nftName,nftIss,nickname,username});
    console.log(user);
    return user.save();
};

nftManage.statics.allowApply = function({index,nftNum}){
    this.updateOne({index},{$set: {state: "수락"}}).exec();
};

nftManage.statics.denyApply = function(index){
    this.updateOne({index},{$set: {state: "거부"}}).exec();
};

nftManage.statics.viewApply = function(index){
    return this.find({"state": "대기"}).sort({index:1}).exec();
};

nftManage.statics.getCount = function(){
    return this.count();
}

module.exports = mongoose.model('nftManage', nftManage);
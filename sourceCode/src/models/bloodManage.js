const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const bloodManage = new Schema({ // 봉사시간 갱신 신청 관리 DB
    index: Number, // 신청 번호
    nickname: String, // 신청자 닉네임
    bloodIss: String, // 헌혈증서
    state: {type: String, default: "대기"}, // 신청 상태(대기, 수락, 거부)
    username: String // 신청자 이름
});

bloodManage.statics.newApply = function({index,bloodIss,nickname,username}){ // 신청 문서 생성
    const user = new this({index,bloodIss,nickname,username});
    console.log(user);
    return user.save();
};

bloodManage.statics.allowApply = function({index,bloodDate}){
    this.updateOne({index},{$set: {state: "수락"}}).exec();
};

bloodManage.statics.denyApply = function(index){
    this.updateOne({index},{$set: {state: "거부"}}).exec();
};

bloodManage.statics.viewApply = function(index){
    return this.find({"state": "대기"}).sort({index:1}).exec();
};

bloodManage.statics.getCount = function(){
    return this.count();
}

module.exports = mongoose.model('bloodManage', bloodManage);
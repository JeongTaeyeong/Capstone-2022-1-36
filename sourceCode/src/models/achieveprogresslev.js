const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const AchieveProgressLev = new Schema({ // 개인 진행도 저장용 DB
    id: String, // 사용자 ID
    volTime: {type: Number, default: 0}, // 봉사시간
    progressedAchieveNum: {type: Number, default: 0}, // 업적 달성 갯수
    doneNum: {type: Number, default: 0}, // 기부액
    bloodNum: {type: Number, default: 0}, // 헌혈횟수
    nickname: String // 사용자 닉네임
});

AchieveProgressLev.statics.userRegist = function(id,nickname){ // 새로운 유저DB생성
    const user = new this({id,nickname});
    return user.save();
};

AchieveProgressLev.statics.findVolTime = function(nickname){
    // ID입력해 봉사시간 불러오기
    var data = this.findOne({nickname},{volTime:true}).exec();
    return data;
};

AchieveProgressLev.statics.findDoneNum = function(nickname){
    // ID입력해 기부액 불러오기
    var data = this.findOne({nickname},{doneNum:true}).exec();
    return data;
};

AchieveProgressLev.statics.findBloodNum = function(nickname){
    // ID입력해 헌혈횟수 불러오기
    var data = this.findOne({nickname},{bloodNum:true}).exec();
    return data;
};

AchieveProgressLev.statics.VolTimeUpdate = function(nickname,VolTime){
    // 봉사시간 업데이트
    //var User = this.findOne({Id}).exec();
    this.updateOne({nickname},{$set: {volTime: VolTime}}).exec();
    //return this.findByIdAndUpdate(User._id,{vol_time: VolTime},{new:true}).exec();
    
};

/*AchieveProgressLev.statics.findDoneNum = function(Id){
    // ID입력해 기부액 불러오기
    this.findOne({Id},function(err,res){
        var num = res.vol_time;
    }).clone().exec();
    return num;
};*/
AchieveProgressLev.statics.DoneUpdate = function(nickname, doneNum){
    // 기부액 업데이트
    return this.findOne({nickname},function(err,res){
        res.updateOne({$set: {doneNum: res.doneNum+doneNum}}).clone().exec();
    }).clone().exec();
};
AchieveProgressLev.statics.BloodUpdate = function(nickname){
    // ID입력해 업적 달성갯수 올리기
    return this.findOne({nickname},function(err,res){
        res.updateOne({$set: {bloodNum: res.bloodNum+1}}).clone().exec();
    }).clone().exec();
};
/*AchieveProgressLev.statics.findAchieveNum = function(id){
    // ID입력해 업적 달성갯수 불러오기
    var data = this.findOne({'Id':id}).exec();
    return data.Progressed_achieve_num;
};*/

// ** 세부 요소 불러오기 기능을 구현하려면 파싱이 필요한것으로 예상되어, 전체 불러오기 외에 다른 기능 주석처리함

AchieveProgressLev.statics.AchieveCount = function(nickname){
    // ID입력해 업적 달성갯수 올리기
    return this.findOne({nickname},function(err,res){
        res.updateOne({$set: {progressedAchieveNum: res.progressedAchieveNum+1}}).clone().exec();
    }).clone().exec();
};
AchieveProgressLev.statics.findAllProgress = function(nickname){
    // ID 입력해 전체 진행도 불러오기
    return this.findOne({nickname}).exec();
};
AchieveProgressLev.statics.printAchieveRank = function(){
    // 전체 DB 업적랭킹순으로 불러오기
    return this.find({"progressedAchieveNum": {$gt: 0}},{"nickname":true,"progressedAchieveNum":true,"_id":false}).sort({progressedAchieveNum:-1}).exec();
};
AchieveProgressLev.statics.printVolRank = function(){
    // 전체 DB 봉사시간랭킹순으로 불러오기
    return this.find({"volTime": {$gt: 0}},{"nickname":true,"volTime":true}).sort({volTime:-1}).exec();
};
AchieveProgressLev.statics.printDoneRank = function(){
    // 전체 DB 기부액랭킹순으로 불러오기
    return this.find({"doneNum": {$gt: 0}},{"nickname":true,"doneNum":true}).sort({doneNum:-1}).exec();
};
AchieveProgressLev.statics.printBDRank = function(){
    // 전체 DB 기부액랭킹순으로 불러오기
    return this.find({"bloodNum": {$gt: 0}},{"nickname":true,"bloodNum":true}).sort({bloodNum:-1}).exec();
};
module.exports = mongoose.model('AchieveProgressLev', AchieveProgressLev);
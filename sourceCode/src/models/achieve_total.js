const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const Achieve_total = new Schema({ // 업적 종류 저장용 DB
    Id: Number, // 업적 구분용 ID
    Image: String, // 업적 이미지
    Name: String, // 업적 이름
    isCon: Boolean,
    //Condition: {name: String, clear: Number} // 자동발급 업적을 위한 달성조건
});

Achieve_total.statics.findAchieveByID = function(Id){
    // 업적 ID 입력해서 해당 업적 정보 불러오기
    return this.findOne({Id}).exec();
};
Achieve_total.statics.viewAchieve = function(Id){
    // 업적 ID 입력해서 해당 업적 정보 불러오기
    return this.find().exec();
};


/*
Achieve_total.statics.findImageByID = function(id){
    // 업적 ID 입력해서 업적 이미지 불러오기
    var data = this.findOne({'Id':id}).exec();
    return data.Image;
};
Achieve_total.statics.findImageAndName = function(id){
    // 업적 ID 입력해서 업적 이미지와 업적 이름 불러오기
    var data = this.findOne({'Id':id}).exec();
    return {image : data.Image, name : data.Name}
};*/

Achieve_total.statics.viewcond = function(){
    return this.find({"isCon": false}).sort({index:1}).exec();
};

// ** 전체 다큐먼트 외에 추가적인 불러오기 기능 주석처리(파싱필요 예상)
module.exports = mongoose.model('Achieve_total', Achieve_total);
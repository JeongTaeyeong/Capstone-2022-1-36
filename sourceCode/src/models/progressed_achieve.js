const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const Progressed_achieve = new Schema({ // 업적 달성여부 DB
    nickname: String, // 사용자 ID
    ProgAchieve: {type:[{idAch: Number, nameAch: String,imgAch: String, dateAch: Date}], default: []} // 달성업적 저장용 배열(업적id, 업적이름, 달성날짜 저장)
});

Progressed_achieve.statics.AddUser = function(nickname){
    //새로운 유저 추가
    const User = new this({
        nickname
    });
    User.save();
};

Progressed_achieve.statics.findAchieveArray = function(nickname){
    // 사용자 ID입력받아 업적달성 배열 불러오기
    return this.findOne({nickname}).exec();
};
Progressed_achieve.statics.AddProgAchieve = function(nickname, IdAch, NameAch, DateAch){
    // 사용자 달성 업적 추가
    console.log(IdAch);
    console.log(NameAch);
    console.log(DateAch);
    this.updateOne({nickname},{$push: {ProgAchieve: {idAch:IdAch, nameAch:NameAch, dateAch:DateAch,imgAch:NameAch+".png"}}}).exec();
    
};

module.exports = mongoose.model('Progressed_achieve', Progressed_achieve);
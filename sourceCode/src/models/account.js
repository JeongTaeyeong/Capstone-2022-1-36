const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png'}
    },
    email: { type: String },
    // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id와 accessToken을 저장
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    isManager: Boolean,
    isIssuer: {type: Boolean, default: false},
    issList: {type:[Number],default:[]},
    password: String, // 로컬 계정의 경우엔 비밀번호를 해싱해서 저장
    walletAddress: String, // 수정가능.
    walletImage: String,
    achievementProgress: [String], // 수정가능
    issuanceCount: {type: Number, default: 0}, // 서비스에서 nft 발행을 받을때마다 1올라간다.
    createdAt: {type: Date, default: Date.now},
    nickname: String
});

Account.statics.AddIssAchieve = function(nickname, issNum){
    // 사용자 달성 업적 추가
    this.updateOne({nickname},{$push: {issList: issNum}}).exec();
    this.updateOne({nickname},{$set:{isIssuer: true}}).exec();
    
};

Account.statics.getWalletImg = function(nickname){
    // 사용자 달성 업적 추가
    return this.findOne({nickname},{walletImage: true}).exec();
    
};

Account.statics.findIssList = function(email) {
    // 객체에 내장되어있는 값을 사용할 때는 객체명.키
    console.log(email);
    return this.findOne({'email':email}).exec();
};

Account.statics.changePassword = function(email, password){
    return this.updateOne({email},{$set: {password:hash(password)}}).exec();
};

Account.statics.changeWalletAddr = function(email, wallet, walletimage){
    this.updateOne({email},{$set: {walletImage:walletimage}}).exec();
    return this.updateOne({email},{$set: {walletAddress:wallet}}).exec();
};

Account.statics.printNftRank = function(){
    return this.find({"issuanceCount":{$gt: 0}},{"nickname": true, "issuanceCount": true}).sort({"issuanceCount":-1}).exec();
};

Account.statics.userSearch = function(){
    return this.find({"nickname":{$gt: 0}},{"nickname": true, "profile.username": true}).exec();
};

Account.statics.findByNickname = function(nickname) {
    // 객체에 내장되어있는 값을 사용할 때는 객체명.키
    return this.findOne({nickname}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Account.statics.findByEmailOrUsername = function({nickname, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'nickname': nickname },
            { email }
        ]
    }).exec();
};

Account.statics.localRegister = function({ username, email, password, nickname}) {
    //데이터를 생성할 때는 new this()를 사용
    const account = new this({
        profile: {
            username
            // thumbnail 값을 설정하지 않으면 기본값으로 설정
        },
        nickname,
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    // 함수로 전달받은 password의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
};

Account.methods.generateToken = function() {
    // JWT에 담을 내용
    const payload = {
        _id: this._id,
        profile: this.profile,
        isIssuer: this.isIssuer,
        isManager: this.isManager,
        nickname: this.nickname,
        email: this.email,
        wallet: this.walletAddress
    };

    return generateToken(payload, 'account');
};


module.exports = mongoose.model('Account', Account);
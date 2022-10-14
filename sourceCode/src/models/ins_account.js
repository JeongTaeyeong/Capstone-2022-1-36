const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Ins_Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png'}
    },
    email: { type: String },
    issList: [Number],
    // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id와 accessToken을 저장
    /*social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },*/ // 발급계정에는 소셜계정 연동 불가능
    isIssuer: Boolean,
    password: String // 로컬 계정의 경우엔 비밀번호를 해싱해서 저장
    /*walletAddress: String, // 수정가능.
    achievementProgress: [String], // 수정가능
    issuanceCount: {type: Number, default: 0}, // 서비스에서 nft 발행을 받을때마다 1올라간다.
    createdAt: {type: Date, default: Date.now}*/ // 발급계정은 nft 소유 불가
});

Ins_Account.statics.AddIssAchieve = function(username, issNum){
    // 사용자 달성 업적 추가
    this.updateOne({'profile.username':username},{$push: {issList: issNum}}).exec();
    this.updateOne({'profile.username':username},{$set:{isIssuer: true}}).exec();
    
};

Ins_Account.statics.findIssList = function(email) {
    // 객체에 내장되어있는 값을 사용할 때는 객체명.키
    return this.findOne({'profile.email':email},{issList:true}).exec();
};

Ins_Account.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용할 때는 객체명.키
    return this.findOne({'profile.username': username}).exec();
};

Ins_Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Ins_Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Ins_Account.statics.localRegister = function({ username, email, password}) {
    //데이터를 생성할 때는 new this()를 사용
    const account = new this({
        profile: {
            username
            // thumbnail 값을 설정하지 않으면 기본값으로 설정
        },
        email,
        password: hash(password)
    });

    return account.save();
}

Ins_Account.methods.validatePassword = function(password) {
    // 함수로 전달받은 password의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
};

Ins_Account.methods.generateToken = function() {
    // JWT에 담을 내용
    const payload = {
        _id: this._id,
        profile: this.profile,
        isIssuer: this.isIssuer,
        nickname: this.profile.username,
        email: this.email
    };

    return generateToken(payload, 'account');
};


module.exports = mongoose.model('Ins_Account', Ins_Account);
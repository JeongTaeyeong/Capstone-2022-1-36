const Joi = require('joi');
const Account = require('models/Account');
const APL = require('models/AchieveProgressLev');
const AT = require('models/Achieve_total');
const PA = require('models/Progressed_achieve');


exports.APLTest1 = async (ctx) =>{
    var ID = 'testID';
    var data = await APL.userRegist(ID);
    ctx.body = 'testing APL';
};

exports.APLTest2 = async (ctx) =>{
    var ID = 'testID';
    var vol = 60;
    var res = await APL.VolTimeUpdate(ID,vol);
    ctx.body = 'test2 APL'+res;
}
exports.APLTest3 = async (ctx) =>{
    var ID = 'testID';
    var res = await APL.findDoneNum(ID);
    ctx.body = 'test3 APL'+'  '+res;
}
exports.APLTest4 = async (ctx) =>{
    var ID = 'testID';
    var res = await APL.AchieveCount(ID);
    res = await APL.findDoneNum(ID);
    ctx.body = 'test4 ApL'+res;
}

exports.PATest1 = async(ctx) =>{
    var ID = 'testID';
    await PA.AddUser(ID);
    ctx.body = 'test1 PA';
}

exports.PATest2 = async(ctx) =>{
    await PA.AddProgAchieve('testID',1,'a',new Date("<2022-08-17>"));
    ctx.body = 'test2 PA';
}
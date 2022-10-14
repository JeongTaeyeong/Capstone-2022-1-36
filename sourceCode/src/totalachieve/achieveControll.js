const AT = require('models/Achieve_total')
const PA = require('models/Progressed_achieve')

exports.loadAchieveNotCond = async (ctx) => {
    ctx.body = await AT.viewcond();
}

exports.findAchieve = async(ctx)=>{
    ctx.body = await AT.findAchieveByID(ctx.request.body.id);
}

exports.viewAchieveList = async(ctx)=>{
    const { user } = ctx.request;

    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }
    ctx.body = await PA.findAchieveArray(user.nickname);
}

exports.viewList = async(ctx)=>{
    ctx.body = await AT.viewAchieve();
    
}
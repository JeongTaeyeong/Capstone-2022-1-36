const Router = require('koa-router');

const totalachieve = new Router();
const achieveControll = require('./achieveControll');

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

totalachieve.get('/loadcond', achieveControll.loadAchieveNotCond);

totalachieve.get('/achlist', achieveControll.viewAchieveList);

totalachieve.post('/findachieve', achieveControll.findAchieve);

totalachieve.get('/list', achieveControll.viewList);

totalachieve.put('/', handler);

totalachieve.patch('/', handler);

module.exports = totalachieve;
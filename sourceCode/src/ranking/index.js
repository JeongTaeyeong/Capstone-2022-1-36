const Router = require('koa-router');

const ranking = new Router();
const rank = require('./ranking')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

ranking.get('/achieve', rank.achieveRankInfo);

ranking.get('/vol', rank.volRankInfo);

ranking.get('/done', rank.doneRankInfo);

ranking.get('/blood', rank.bloodRankInfo);

ranking.get('/nft', rank.nftRankInfo);

ranking.post('/', handler);

ranking.delete('/', handler);

ranking.put('/', handler);

ranking.patch('/', handler);

module.exports = ranking;
const Router = require('koa-router');

const nft_issue = new Router();
const control = require('./nftissue')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

nft_issue.get('/count', control.getcount);

nft_issue.post('/nftapply', control.nftInsApply);

nft_issue.delete('/', handler);

nft_issue.put('/', handler);

nft_issue.patch('/', handler);

module.exports = nft_issue;
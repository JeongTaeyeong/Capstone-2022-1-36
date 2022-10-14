const Router = require('koa-router');

const nft_choice = new Router();
const nfthandle = require('./nftchoice')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

nft_choice.get('/viewlist', nfthandle.viewIssNft);

nft_choice.post('/', handler);

nft_choice.delete('/', handler);

nft_choice.put('/', handler);

nft_choice.patch('/', handler);

module.exports = nft_choice;
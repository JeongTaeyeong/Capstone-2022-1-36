const Router = require('koa-router');
const meta = new Router();
const MetaMask = require('lib/metamask');
const OpenSea = require('lib/opensea');

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

meta.get('/test/:Userid', OpenSea.returnListNFT);
meta.post('/getTC', MetaMask.getTC);
meta.delete('/', handler);
meta.put('/', handler);
meta.patch('/', handler);

module.exports = meta;
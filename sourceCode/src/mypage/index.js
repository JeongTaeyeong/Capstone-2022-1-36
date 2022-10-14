const Router = require('koa-router');

const mypage = new Router();

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

mypage.get('/', handler);

mypage.post('/', handler);

mypage.delete('/', handler);

mypage.put('/', handler);

mypage.patch('/', handler);

module.exports = mypage;
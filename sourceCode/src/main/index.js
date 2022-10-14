const Router = require('koa-router');

const main = new Router();

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

main.get('/', handler);

main.post('/', handler);

main.delete('/', handler);

main.put('/', handler);

main.patch('/', handler);

module.exports = main;
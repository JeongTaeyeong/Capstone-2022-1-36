const Router = require('koa-router');

const log_in = new Router();

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

log_in.get('/', handler);

log_in.post('/', handler);

log_in.delete('/', handler);

log_in.put('/', handler);

log_in.patch('/', handler);

module.exports = log_in;
const Router = require('koa-router');

const auth_apply = new Router();
const apply = require('./auth.apply')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

auth_apply.get('/count', apply.getcount);

auth_apply.post('/issapply', apply.issApply);

auth_apply.delete('/', handler);

auth_apply.put('/', handler);

auth_apply.patch('/', handler);

module.exports = auth_apply;
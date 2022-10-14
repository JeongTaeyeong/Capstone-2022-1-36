const Router = require('koa-router');

const user_search = new Router();
const search = require('./userSearch')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

user_search.get('/userlist', search.viewUserList);

user_search.post('/finduser', search.fineUserList);

user_search.delete('/', handler);

user_search.put('/', handler);

user_search.patch('/', handler);

module.exports = user_search;
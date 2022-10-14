const Router = require('koa-router');

const progress = new Router();
const getachieve = require('./getachieve')
const getprogress = require('./getprogress')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

progress.get('/viewachieve', getachieve.loadachieve);

progress.get('/viewprogress', getprogress.loadprogress);

progress.post('/', handler);

progress.delete('/', handler);

progress.put('/', handler);

progress.patch('/', handler);

module.exports = progress;
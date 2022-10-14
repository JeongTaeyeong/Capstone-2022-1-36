const Router = require('koa-router');

const notice = new Router();
const noticeHandle = require('./notice')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

notice.get('/getlist/:ran', noticeHandle.viewNotice);

notice.get('/viewmustread', noticeHandle.viewNoticeMust);

notice.post('/writenotice', noticeHandle.writeNotice);

notice.get('/findnotice/:index', noticeHandle.findNotice);

notice.get('/getcount', noticeHandle.getCount);

notice.put('/', handler);

notice.patch('/', handler);

module.exports = notice;
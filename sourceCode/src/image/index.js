const Router = require('koa-router');

const image = new Router();
const getimage = require('./getimage')

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

image.get('/', handler);

image.get('/getimage/:key', getimage.getimage);

image.get('/getimage2', getimage.getimage2);

image.delete('/', handler);

image.put('/', handler);

image.patch('/', handler);

module.exports = image;
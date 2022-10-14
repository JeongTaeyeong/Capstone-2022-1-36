const fs = require('fs').promises;
var mime = require('mime');
const {Blob} = require('buffer');
require('dotenv').config();

// 업적 불러오기

exports.getimage = async (ctx) => {
    const { key } = ctx.params;
    console.log(key);
    var imgMime = mime.getType('./src/assets/achieves/'+key);
    ctx.type = imgMime;
    var ret = await fs.readFile('./src/assets/achieves/'+key);
    console.log(ret);
    ctx.body = ret;
    console.log(ctx.body);
}

exports.getimage2 = async (ctx) => {
    var key = process.env.NFT_NAME;
    console.log(key);
    var imgMime = mime.getType('./tmp/nft/'+key);
    ctx.type = imgMime;
    var ret = await fs.readFile('./tmp/nft/'+key);
    console.log(ret);
    ctx.body = ret;
    console.log(ctx.body);
}
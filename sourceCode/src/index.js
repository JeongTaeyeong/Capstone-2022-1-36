require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');


mongoose.Promise = global.Promise; // use node native Promise
// connect mongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useMongoClient: true // needed for mongoose version under 5.0.0
}).then(
    (response) => {
        console.log('Sucessfully connected to mongoDB');
        console.log('MONGO_URI is ' + process.env.MONGO_URI);
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT || 4000; // 4000 if not defined

/* link part */
const auth_account = require('./auth_account');
const auth_apply = require('./auth_apply');
const log_in = require('./log_in');
const main = require('./main');
const manage_page = require('./manage_page');
const mypage = require('./mypage');
const nft_choice = require('./nft_choice');
const nft_issue = require('./nft_issue');
const ranking = require('./ranking');
const user_search = require('./user_search');
const vms_ins = require('./vms_ins');
const progress = require('./progress');
const image = require('./image');
const notice = require('./notice');
const totalachieve = require('./totalachieve');
const meta = require('./meta');
const DB_test = require('./DB_Test');

const multer = require('@koa/multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './tmp/uploads')
    },
    filename: function(req, file, cb){
        cb(null, unescape(file.originalname))
    }
})
const storage2 = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './tmp/nft')
    },
    filename: function(req, file, cb){
        cb(null, unescape(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const upload2 = multer({
    storage: storage2
})

app.proxy = true
app.use(bodyParser()); // have to be upward of router
app.use(jwtMiddleware); // apply middleware

router.post('/api/upload', upload.single('file'), (ctx, next)=>{
    console.log("ok");
    console.log(ctx.request.file);
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = ctx.request.file
    const { name } = ctx.request.body;

    console.log("body 데이터 : ", name);
    console.log("폼에 정의된 필드명 : ", fieldname);
    console.log("사용자가 업로드한 파일 명 : ", originalname);
    console.log("파일의 엔코딩 타입 : ", encoding);
    console.log("파일의 Mime 타입 : ", mimetype);
    console.log("파일이 저장된 폴더 : ", destination);
    console.log("destinatin에 저장된 파일 명 : ", filename);
    console.log("업로드된 파일의 전체 경로 ", path);
    console.log("파일의 바이트(byte 사이즈)", size);

    ctx.body = {ok: true, data: "Single Upload Ok"}
})

router.post('/api/upload2', upload2.single('file'), (ctx, next)=>{
    console.log("ok");
    
    console.log(ctx.request.file);
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = ctx.request.file
    const { name } = ctx.request.body;
    process.env.NFT_NAME = filename;

    console.log("body 데이터 : ", name);
    console.log("폼에 정의된 필드명 : ", fieldname);
    console.log("사용자가 업로드한 파일 명 : ", originalname);
    console.log("파일의 엔코딩 타입 : ", encoding);
    console.log("파일의 Mime 타입 : ", mimetype);
    console.log("파일이 저장된 폴더 : ", destination);
    console.log("destinatin에 저장된 파일 명 : ", filename);
    console.log("업로드된 파일의 전체 경로 ", path);
    console.log("파일의 바이트(byte 사이즈)", size);

    ctx.body = {ok: true, data: "Single Upload Ok"}
})

router.use('/api/auth_account', auth_account.routes());
router.use('/api/auth_apply', auth_apply.routes());
router.use('/api/log_in', log_in.routes());
router.use('/api/main', main.routes());
router.use('/api/manage_page', manage_page.routes());
router.use('/api/mypage', mypage.routes());
router.use('/api/nft_choice', nft_choice.routes());
router.use('/api/nft_issue', nft_issue.routes());
router.use('/api/ranking', ranking.routes());
router.use('/api/user_search', user_search.routes());
router.use('/api/vms_ins', vms_ins.routes());
router.use('/api/progress', progress.routes());
router.use('/api/image', image.routes());
router.use('/api/notice', notice.routes());
router.use('/api/achieve', totalachieve.routes());
router.use('/api/meta', meta.routes());
router.use('/DB_test', DB_test.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('test server is listening to port ' + port);
})
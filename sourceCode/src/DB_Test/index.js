const Router = require('koa-router');
const DB_test = new Router();
const DbTest = require('./db_test');

DB_test.get('/1', DbTest.APLTest1);
DB_test.get('/2', DbTest.APLTest2);
DB_test.get('/3', DbTest.APLTest3);
DB_test.get('/4', DbTest.APLTest4);
DB_test.get('/5', DbTest.PATest1);
DB_test.get('/6', DbTest.PATest2);


module.exports = DB_test;
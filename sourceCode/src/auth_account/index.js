const Router = require('koa-router');
const auth_account = new Router();
const authCtrl = require('./auth.controller');

auth_account.post('/register/local', authCtrl.localRegister);
auth_account.post('/register/ins', authCtrl.localInsRegister);
auth_account.post('/login/local', authCtrl.localLogin);
auth_account.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth_account.post('/logout', authCtrl.logout);
auth_account.get('/check', authCtrl.check);

auth_account.post('/ins/register/local', authCtrl.localRegister);
auth_account.post('/ins/login/local', authCtrl.localLogin);
auth_account.get('/ins/exists/:key(email|username)/:value', authCtrl.exists);
auth_account.post('/ins/logout', authCtrl.logout);
auth_account.get('/ins/check', authCtrl.check);

auth_account.post('/changepass', authCtrl.changePass);
auth_account.post('/changewall', authCtrl.changeWallet);
auth_account.post('/getwallimg', authCtrl.getWalletImg);

module.exports = auth_account;
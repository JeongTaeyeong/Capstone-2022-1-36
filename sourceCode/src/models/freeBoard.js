const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const freeBoard = new Schema({ // 자유게시판 DB
    index: Number, // 글 번호
    title: String, // 게시글 제목
    writer: String, // 작성자 email
    date: Date, // 작성시간
    word: String, // 내용
    comments: {type:[{comment: String, commenter: String, comDate: Date}], default: []}, //댓글 
});
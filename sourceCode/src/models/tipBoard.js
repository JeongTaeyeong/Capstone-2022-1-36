const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');


const tipBoard = new Schema({ // 정보게시판 DB
    title: String, // 게시글 제목
    writer: String, // 작성자 email
    date: Date, // 작성시간
    comments: {type:[{comment: String, commenter: String, comDate: Date}], default: []}, //댓글 
});
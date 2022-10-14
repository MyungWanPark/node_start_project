const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('모든 요청에서 미들웨어가 실행됩니다.')
    next();
});

app.use('/', (req, res, next) => {
    console.log('get 요청에서 미들웨어가 실행됩니다.')
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=> {
    console.log('✅', app.get('port'),'번 포트에서 대기중');
});
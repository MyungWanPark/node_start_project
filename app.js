const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.set('trust proxy', 1);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        // domain: 'localhost',
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

/* app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})) */

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    console.log('모든 요청에서 미들웨어가 실행됩니다.')
    next();
});

app.use('/', (req, res, next) => {
    console.log('get 요청에서 미들웨어가 실행됩니다.')
    next();
}
/* , (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
} */
);

app.use((req, res, next) => {
    res.status(404).send('not found!');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=> {
    console.log('✅', app.get('port'),'번 포트에서 대기중');
});
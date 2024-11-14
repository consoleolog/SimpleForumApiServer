import express from "express";
import routes from "./routes/v1/index"
import passport from "passport";
import session from "express-session";
import localStrategy from "./config/passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Passport Setting */
app.use(passport.initialize());
app.use(session({
    secret: 'sessionscret',
    resave: false,           // 요청 할 때 마다 세션 갱신
    saveUninitialized: false // 로그인 안해도 세션 하나 발행
}));
app.use(passport.session());

passport.use(localStrategy);

app.use('/v1', routes);

export default app;
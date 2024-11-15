import express from "express";
import routes from "./routes/v1/index"
import passport from "passport";
import {jwtStrategy, localStrategy} from "./config/passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

/* Cookie */
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
passport.use('local',localStrategy);

app.use(helmet());

app.use('/v1', routes);

export default app;
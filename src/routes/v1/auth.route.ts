import { Router } from "express";
import { connectDB } from "../../config/database";
import { Db } from "mongodb";
import passport from "passport";
import {JwtUtil} from "../../utils/jwt.util";
import {CookieUtil} from "../../utils/cookie.util";
import {getRequestSwaggerFormFor} from "../../utils/requestToSwagger";
import { authValidation } from "../../validations/index";
import definitions from "../../docs/definitions";
import components from "../../docs/components";
import validate from "../../middlewares/validate";
import { authController } from "../../controllers/";

const router = Router();

let db: Db;

connectDB.then((client)=>{
    db = client.db('simple-forum');
})

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error: any, user: any, info: any) => {

        if (error) return res.status(500).json(error);

        if (!user) return res.status(401).json(info.message);

        const accessToken = JwtUtil.createAccessToken(user);
        const refreshToken = JwtUtil.createRefreshToken(user);

        // 쿠키 설정
        CookieUtil.addCookie('access_token', accessToken, 60 * 60 * 1000, res);
        CookieUtil.addCookie('refresh_token', refreshToken, 60 * 60 * 4000, res);

        // 성공 응답
        res.status(200).json("success");
    })(req, res, next);
});

export default router;

export const swAuthRouter = {
    '/auth/register': {
        post: {
            summary: '회원가입',
            description: '사용자 정보를 저장하고 인증 토큰을 제공합니다.',
            tags: ['Auth'],
            ...getRequestSwaggerFormFor(authValidation.register),
            response: {
                '201': {
                    description: 'Created Account',
                    content: {
                        'application/json;charset=utf-8': {
                            schema: {}
                        },
                    },
                },
                '400': {
                    description: 'Bad Request',
                    content: {
                        'application/json;charset=utf-8': {
                            schema: definitions.Error,
                            examples: {
                                INPUT_VALIDATION_ERROR: components.Error.INPUT_VALIDATION_ERROR,
                            },
                        },
                    },
                },
            },
        },
    },
    '/auth/logout/{user}': {
        post: {
            summary: '로그아웃',
            description: '사용자 인증 토큰을 제거합니다.',
            tags: ['Auth'],
            ...getRequestSwaggerFormFor(authValidation.logout),
            response: {
                '200': { description: 'Ok' },
            }
        }
    },
    '/auth/refresh': {
        post: {
            summary: '토큰 갱신',
            description: '사용자의 access token 과 refresh token 확인 후 갱신',
            tags: ['Auth'],
            ...getRequestSwaggerFormFor(authValidation.refreshToken),
            response: {
                '200': {
                    description: 'Ok',
                },
            },
        },
    },
};


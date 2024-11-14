import { Router } from "express"
import mainRoute from "./main.route";
import accountRoute from "./account.route"
import authRoute from "./auth.route";

const router = Router();

const defaultRoutes = [
    {
        path: '',
        route: mainRoute,
    },
    {
        path: '/account',
        route: accountRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    }
];


defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
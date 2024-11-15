import { Router } from "express"
import mainRoute from "./main.route";
import accountRoute from "./account.route"
import authRoute from "./auth.route";
import docsRoute from "./docs.route";
import config from "../../config/config";

const router = Router();

const defaultRoutes = [
    {
        path: '/',
        route: mainRoute,
    },
    {
        path: '/accounts',
        route: accountRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
];


defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

if (config.env === 'development'){
    devRoutes.forEach(route => {
        router.use(route.path, route.route);
    });
}

export default router;
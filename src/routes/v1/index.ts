import { Router } from "express"
import mainRoute from "./main.route";

const router = Router();

const defaultRoutes = [
    {
        path: '',
        route: mainRoute,
    },
];


defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
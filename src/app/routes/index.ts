import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { eventRoutes } from '../modules/events/events.route';
import { reviewRoutes } from '../modules/ratting/ratting.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/event',
        route: eventRoutes
    },
    {
        path: '/review',
        route: reviewRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
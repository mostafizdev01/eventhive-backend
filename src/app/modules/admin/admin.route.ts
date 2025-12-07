import express from 'express'
import { AdminController } from './admin.controller';


const router = express.Router();

router.get(
    "/all-user", AdminController.getAllUser
);


export const adminRoutes = router;
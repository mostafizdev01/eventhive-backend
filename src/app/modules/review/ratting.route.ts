import express from 'express'
import { RattingControllers } from './ratting.controller';


const router = express.Router();

router.post(
    "/create-ratting",  RattingControllers.createReview
);


export const reviewRoutes = router;
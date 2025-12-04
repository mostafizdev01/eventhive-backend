import express from 'express'
import { EventControllers } from './events.controller';


const router = express.Router();

router.post(
    "/create-event",
    EventControllers.createEvent
)

export const eventRoutes = router;
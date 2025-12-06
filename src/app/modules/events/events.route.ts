import express, { NextFunction, Request, Response } from 'express'
import { EventControllers } from './events.controller';
import { fileUploader } from '../../helper/fileUploader';
import { EventValidation } from './event.validation';
import { JoinEventControllers } from '../joinEvent/joinevent.controller';


const router = express.Router();

router.post(
    "/create-event",
    fileUploader.upload.single("file"),
    (req:Request, res:Response, next:NextFunction) => {
        req.body = EventValidation.createEventValidationSchema.parse(JSON.parse(req.body.data))
        return EventControllers.createEvent(req, res, next)
    },
);

router.post(
    "/create-joinevent",  JoinEventControllers.createJoinEvent
);

export const eventRoutes = router;
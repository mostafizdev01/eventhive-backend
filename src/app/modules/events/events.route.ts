import express, { NextFunction, Request, Response } from 'express'
import { EventControllers } from './events.controller';
import { fileUploader } from '../../helper/fileUploader';
import { EventValidation } from './event.validation';
import { JoinEventControllers } from '../joinEvent/joinevent.controller';
import authCookies from '../../middleware/authCookies';
import { UserRole } from '../../../../generated/prisma/enums';


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

router.post("/my-event",  EventControllers.getMyEvent)

export const eventRoutes = router;
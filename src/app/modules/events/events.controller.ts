import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { EventServices } from "./events.services";


const createEvent = catchAsync(async (req: Request, res: Response) => {
    const result = await EventServices.createEvent(req);
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Event Created successfully!",
        data: result
    })
})

const getMyEvent = catchAsync(async (req: Request, res: Response) => {
    const {hostId} = req.body
    const result = await EventServices.getMyEvent(hostId);
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Event Created successfully!",
        data: result
    })
})

export const EventControllers = {
    createEvent,
    getMyEvent
}
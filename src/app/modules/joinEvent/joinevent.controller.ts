import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { JoinEventServices } from "./joinevent.services";

const createJoinEvent = catchAsync(async (req: Request, res: Response) => {
    console.log("req.body", req.body)
    const result = await JoinEventServices.createJoinEvent(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Event Join Successfully!",
        data: result
    })
})

export const JoinEventControllers = {
    createJoinEvent
}
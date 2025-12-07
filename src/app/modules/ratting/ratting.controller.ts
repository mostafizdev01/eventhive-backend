import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewServices } from "./ratting.services";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewServices.createReview(req.body)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Review successfully!",
        data: result
    })
})

export const RattingControllers = {
    createReview
}
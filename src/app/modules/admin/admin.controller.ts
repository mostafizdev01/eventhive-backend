import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdminServices } from "./admin.services";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getAllUser()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All User Get successfully!",
        data: result
    })
})

export const AdminController = {
    getAllUser
}
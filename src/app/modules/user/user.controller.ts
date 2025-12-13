import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createUser = async (req: Request, res: Response, next:NextFunction) => {
    const result = await userServices.createUser(req);

   res.status(200).json({ success: true, message: "User Created Successfull...", result});
}

const createHost = async (req: Request, res: Response, next:NextFunction) => {
    const result = await userServices.createHost(req);

   res.status(200).json({ success: true, message: "Host Created Successfull...", result});
}

const getUserInfo = catchAsync(async (req, res) => {
//   const { email } = req.body;
const {email} = req.body;
  const result = await userServices.getUserInfo(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User info fetched successfully",
    data: result,
  });
});


export const UserController = {
    createUser,
    createHost,
    getUserInfo
}
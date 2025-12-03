import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response, next:NextFunction) => {
    const result = await userServices.createUser(req);

   res.status(200).json({ success: true, message: "User Created Successfull...", result});
}


export const UserController = {
    createUser
}
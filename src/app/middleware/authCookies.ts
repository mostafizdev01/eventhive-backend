import { NextFunction, Request, Response } from "express"
import AppError from "../customizer/AppErrror";
import {verifyToken} from "../helper/jwtHelper"
import { envVars } from "../../config/env";

const authCookies = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            // console.log("roles---",...roles)
            const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];


            if (!token) {
                throw new AppError(403, "you don't have a token!")
            }

            const verifyUser = verifyToken(token, envVars.JWT_SECRET as string);

            if (!roles.includes(verifyUser.role)) {
                throw new AppError(403, "You are not authorized!")
            }

            req.user = verifyUser;

            // console.log("cokieUser:", verifyUser.role)



            next();
        }
        catch (err) {
            next(err)
        }
    }
}

export default authCookies;
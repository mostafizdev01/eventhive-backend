
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../helper/jwtHelper";
import { UserStatus } from "../../../../generated/prisma/enums";
import { envVars } from "../../../config/env";
import ApiError from "../../errors/ApiError";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }, 
        include: {
            host: true
        }
    })

    if (!user) {
        throw new ApiError(404, "Email is incorrect!")
    }

    const {password, ...data} = user;

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new ApiError(403,"Password is incorrect!")
    }

    const accessToken = jwtHelper.generateToken(data, envVars.JWT_SECRET, "7d");

    const refreshToken = jwtHelper.generateToken(data, envVars.JWT_SECRET, "90d");

    return {
        accessToken,
        refreshToken,
        data
    }
}

export const AuthService = {
    login
}
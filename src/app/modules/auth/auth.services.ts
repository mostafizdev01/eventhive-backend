
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { jwtHelper } from "../../helper/jwtHelper";
import { UserStatus } from "../../../../generated/prisma/enums";
import { envVars } from "../../../config/env";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    if (!user) {
        throw new Error("Email is incorrect!")
    }

    const {password, ...data} = user;

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }

    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, envVars.JWT_SECRET, "7d");

    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, envVars.JWT_SECRET, "90d");

    return {
        accessToken,
        refreshToken,
        data
    }
}

export const AuthService = {
    login
}
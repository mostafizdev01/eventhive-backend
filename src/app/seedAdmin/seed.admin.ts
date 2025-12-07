import { UserRole } from "../../../generated/prisma/enums";
import { envVars } from "../../config/env";
import { prisma } from "../shared/prisma";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
    try {
        // Check if an admin user already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email:  envVars?.AMDIN_EMAIL},
        });

        if (existingAdmin) {
            console.log("🥵 Super Admin already exists.");
            return;
        }


        // Hash admin password
        const hashedPassword = await bcrypt.hash(envVars?.AMDIN_PASS, Number(envVars.BCRYPT_SALT_ROUND));

        // Create the admin user
        const result = await prisma.user.create({
            data: {
                email: envVars?.AMDIN_EMAIL,
                password: hashedPassword,
                address: "Rajshahi Bangladesh",
                name: "Md Mostafiz (Admin)",
                role: UserRole.ADMIN,
                status: "ACTIVE",
            },
        });

        return result

    } catch (error) {
        console.error("❌ Admin seeding error:", error);
    } finally {
        await prisma.$disconnect();
    }
};
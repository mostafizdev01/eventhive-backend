// import { Gender } from "@prisma/client";
import z from "zod";

const createEventValidationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("description is required"),
    hostId: z.string().nonempty("hostId is required"),
    category: z.string().nonempty("category is required"),
    ticketPrice: z.coerce.number().min(0, "ticketPrice is required"),
    totalSeats: z.coerce.number().min(1, "totalSeats is required"),
    availableSeats: z.coerce.number().min(0, "availableSeats is required"),
    location: z.string().nonempty("location is required"),
    eventDate: z.string().nonempty("eventDate is required"),
    startTime: z.string().nonempty("startTime is required"),
    endTime: z.string().nonempty("endTime is required"),
    // password: z.string()
});

// const createAdminValidationSchema = z.object({
//     password: z.string({
//         error: "Password is required"
//     }),
//     admin: z.object({
//         name: z.string({
//             error: "Name is required!"
//         }),
//         email: z.string({
//             error: "Email is required!"
//         }),
//         contactNumber: z.string({
//             error: "Contact Number is required!"
//         })
//     })
// });

// const createDoctorValidationSchema = z.object({
//     password: z.string({
//         error: "Password is required"
//     }),
//     doctor: z.object({
//         name: z.string({
//             error: "Name is required!"
//         }),
//         email: z.string({
//             error: "Email is required!"
//         }),
//         contactNumber: z.string({
//             error: "Contact Number is required!"
//         }),
//         address: z.string().optional(),
//         registrationNumber: z.string({
//             error: "Reg number is required"
//         }),
//         experience: z.number().optional(),
//         gender: z.enum([Gender.MALE, Gender.FEMALE]),
//         appointmentFee: z.number({
//             error: "appointment fee is required"
//         }),
//         qualification: z.string({
//             error: "quilification is required"
//         }),
//         currentWorkingPlace: z.string({
//             error: "Current working place is required!"
//         }),
//         designation: z.string({
//             error: "Designation is required!"
//         })
//     })
// });

export const EventValidation = {
    createEventValidationSchema,
    // createAdminValidationSchema,
    // createDoctorValidationSchema
}
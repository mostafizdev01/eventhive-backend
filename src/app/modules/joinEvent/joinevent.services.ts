import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma"


const createJoinEvent = async (payload: any) => {
    console.log("payload", payload)
   return payload
}

export const JoinEventServices = {
    createJoinEvent
}
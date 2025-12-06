import { prisma } from "../../shared/prisma"


const createEvent = async (payload: any) => {
   const result = await prisma.event.create({
    data: payload
   })
   
   return result
}

export const EventServices = {
    createEvent
}
import { SortOrder } from './../../../../generated/prisma/internal/prismaNamespaceBrowser';
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma"


const createEvent = async (req: any) => {

    const body = req.body;
    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        body.bannerImage = uploadResult?.secure_url
    }
    
   const result = await prisma.event.create({
    data: body
   })

   return result
}

const getMyEvent = async (hostId: string) => {
    if(!hostId){
        return []
    }
    const result = await prisma.event.findMany({
        where : {hostId},
        orderBy: {
            createdAt: "desc"
        }
    })

    return result

}

/// get all event
const getAllEvent = async () => {
    const res = await prisma.event.findMany();
    return res;
}

// get single event
const getSingleEvent = async (eventId: string)=> {
    if(!eventId){
        return []
    }
    const res = await prisma.event.findUnique({
        where: {id: eventId},
        include: {
            hosts: true,
            reviews: true
        }
    })

    return res
}

export const EventServices = {
    createEvent,
    getMyEvent,
    getAllEvent,
    getSingleEvent
}
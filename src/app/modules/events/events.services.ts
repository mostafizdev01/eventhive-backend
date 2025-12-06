import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma"


const createEvent = async (req: any) => {

    const body = req.body;
    console.log("body ✅", body)

    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        body.bannerImage = uploadResult?.secure_url
    }

   const result = await prisma.event.create({
    data: body
   })

   return result
}

export const EventServices = {
    createEvent
}
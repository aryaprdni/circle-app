import { v2 as cloudinary } from "cloudinary";

export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: 'dfxemmpwk',
            api_key: '473542356422835',
            api_secret: 'znKAF-l7cnqMLAp1heOFyDXGxrg',
            secure: true,
        })
    }

    async destination(image:string) : Promise<any> {
        try {
            return await cloudinary.uploader.upload(`src/uploads/${image}`)
        } catch (error) {
            throw error
        }
    }
}
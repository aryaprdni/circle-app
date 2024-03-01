import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
  config() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
  }

  async destination(image: string): Promise<any> {
    try {
      return await cloudinary.uploader.upload(process.env.KEY_DEST + image, { folder: "threads-app" });
    } catch (error) {
      throw error;
    }
  }
})();

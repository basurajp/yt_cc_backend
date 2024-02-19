import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// we are using unlink for deleting the file from the server

cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SCERET,
});

const uploadOnCloudnry = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file is uploaded on cloudinary
    // console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath); //  removed the locally saved temporary file  as the upload operation got failed

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //  removed the locally saved temporary file  as the upload operation got failed
    return null
  }
};



export { uploadOnCloudnry };
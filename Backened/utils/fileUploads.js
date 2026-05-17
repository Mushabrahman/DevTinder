const cloudinary = require("../config/cloudinary");

 const uploadImage = async (folder, filePath) => {
    try {
        return await cloudinary.uploader.upload(filePath, { folder });
    }
    catch (error) {
        return { error };
    }
};

module.exports =  uploadImage 
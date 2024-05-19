const cloudinary = require('cloudinary').v2;

exports.isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
}

exports.uploadFileToCloudinary = async (file, folder, quality) => {
    try {
        const options = {};
        if (!folder) {
            options.folder = folder;
        }
        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";
        if (file.length && file.length > 1) {
            const uploadedImages = [];
            for (const image of file) {
                const result = await cloudinary.uploader.upload(image.tempFilePath, options);
                uploadedImages.push(result);
            }
            return uploadedImages;
        } else {
            const result = await cloudinary.uploader.upload(file.tempFilePath, options);

            return result;
        }



    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
}
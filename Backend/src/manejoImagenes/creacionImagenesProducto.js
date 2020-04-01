// require('dotenv').config();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('imagen_producto');
const cloudinary = require('cloudinary').v2;

function enviarImagenCloudinary(req) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
    return new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) return resolve(null);
                return resolve(result.url);
            })
            .end(req.file.buffer);
    });
}

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) return reject(err);
            return resolve(enviarImagenCloudinary(req));
        });
    });
};
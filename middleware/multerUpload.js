const multer = require('multer');
const path = require('path');
const datauri = require('datauri/parser');

let storage;

switch(process.env.IMAGE_SAVE_MODE){
    case 'local':
        storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './uploads');
             },
            filename: function (req, file, cb) {
                cb(null , Date.now() + path.extname(file.originalname));
            }
        });  
        break;
    case 'cloudinary':
        storage = multer.memoryStorage();
        break;
}

const dUri = new datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
const upload = multer({ storage }).single('image');

module.exports = {
    upload,
    dataUri,
}
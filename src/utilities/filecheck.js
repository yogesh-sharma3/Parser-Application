const path = require('path');
const multer = require('multer')

const uploadPath = path.resolve(__dirname, '../', '../', 'upload');

const upload = multer({
    dest: uploadPath,
});

const fileCheck = function (file) {
    if (!file) {
        return {
            message: "Please upload a csv file"
        }
    } else if (file.mimetype !== 'text/csv') {
        return {
            message: "Wrong file type, please upload csv file"
        }
    } else if (file.size > 1000000) {
        return {
            message: "File size is too large,file size should be less than 1 MB "
        }
    }
}

module.exports = {
    upload,
    fileCheck
};
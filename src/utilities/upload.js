const fs = require('fs');
const papa = require('papaparse');


function csvToJson(file) {
    return new Promise(function (resolve, reject) {
        if (file.mimetype !== 'text/csv') {
            return reject("wrong file type, plz upload csv")
        }
        fs.readFile(file.path, 'utf8', function (err, data) {
            if (err) {
                return reject("error reading the file");
            }
            const jsonData = papa.parse(data, {
                header: true
            });
            fs.unlink(file.path, function (err) {});
            resolve(jsonData)
        })
    })

}

module.exports = csvToJson;
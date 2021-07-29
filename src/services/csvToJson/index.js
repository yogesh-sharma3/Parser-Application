const fs = require('fs');
const papa = require('papaparse');
const helper = global.helper;
const config = helper.config;
const utilites = require('../../utilities');
const logger = utilites.logger;
const log = logger('welcome.service');
const {
    fileCheck
} = require('../../utilities/filecheck');


/**
 * Welcome
 * 
 * @param {object} body
 * 
 */

function csvToJson(file) {
    return new Promise(function (resolve, reject) {
        const errorMessage = fileCheck(file);
        if (errorMessage) {
            return reject(errorMessage.message)
        }
        fs.readFile(file.path, 'utf8', function (err, data) {
            if (err) {
                return reject("Error reading the file");
            }
            const jsonData = papa.parse(data, {
                header: true
            });
            fs.unlink(file.path, function (err) {});
            resolve(jsonData.data)
        })
    })
}
module.exports = csvToJson;
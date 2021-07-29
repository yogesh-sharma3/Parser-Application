const fs = require('fs');
const papa = require('papaparse');
const helper = global.helper;
const config = helper.config;
const utilites = require('../../utilities');
const logger = utilites.logger;
const log = logger('welcome.service');
const {fileCheck} = require('../../utilities/filecheck');
/**
 * Welcome
 * 
 * @param {object} body
 * 
 */

function filterCsvData(file, lookupKey) {

    return new Promise(function (resolve, reject) {
        const errorMessage = fileCheck(file);
        if (errorMessage) {
            return reject(errorMessage.message)
        }
        if (!lookupKey) {
            return reject("Please pass query param 'lookupKey' parameter")
        }
        fs.readFile(file.path, 'utf8', function (err, data) {
            if (err) {
                return reject("Error reading the file");
            }
            const jsonData = papa.parse(data, {
                header: true,
            });
            const jsonDataArray = jsonData.data;
            if (!jsonDataArray) {
                return reject("Unable to find Json data")
            }
            const rejectedKeys = []
            const responseData = jsonDataArray.map(function (item, index) {
                let keys = lookupKey.split(",");
                const keyData = {}
                keys.forEach(function (inneritem, index) {
                    if (jsonData.meta.fields.includes(inneritem)) {
                        keyData[inneritem] = item[inneritem]
                    } else {
                        if (!rejectedKeys.includes(inneritem)) {
                            rejectedKeys.push(inneritem)
                        }
                    }
                })
                if (Object.keys(keyData).length === 0) {
                    return null;
                } else {
                    return keyData
                };
            }).filter(function (item, index) {
                return item !== null;
            })
            fs.unlink(file.path, function (err) {});
            resolve([responseData, rejectedKeys])
        })
    })
}

module.exports = filterCsvData;
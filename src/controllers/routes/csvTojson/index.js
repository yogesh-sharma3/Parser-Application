const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const middlewares = require('../../../middlewares');
const sanitize = middlewares.sanitize;
const isAuthorized = middlewares.isAuthorized;
const validate = middlewares.validate;
const services = require('../../../services');
const {lookupKey: rules} = require('../../../../rules');
const {safePromise} = require('../../../utilities');
const filterCsvData = services.filterCsvData;
const transformCsvData = services.transformCsvData;
const processFileUpload = require('../../../utilities/filecheck').upload.single('csv');
const csvToJson = services.csvToJson;

router.post('/csvToJsonConversion', isAuthorized, processFileUpload, async (req, res, next) => {
    const [error, result] = await safePromise(csvToJson(req.file));
    if (error) {
        const resp = {
            success: false,
            error: error
        }
        return res.json(resp);
    }
    const resp = {
        success: true,
        message: 'CSV file uploaded and Json data fetched',
        result: result
    }
    res.json(resp);
});


router.post('/filterCsvData', isAuthorized, processFileUpload, sanitize, validate(rules), async (req, res, next) => {
    const [error, result] = await safePromise(filterCsvData(req.file, req.payload.lookupKey));
    if (error) {
        const resp = {
            success: false,
            error: error
        }
        return res.json(resp);
    }
    const resp = {
        success: true,
        message: 'Filtered Json data fetched',
        rejectedKeys: `Keys not present in the csv data are : ${result[1]}`,
        result: result[0]
    }
    res.json(resp);
});


router.post('/transformCsvData', isAuthorized, processFileUpload, sanitize, validate(rules), async (req, res, next) => {
    const [error, result] = await safePromise(transformCsvData(req.file, req.payload.lookupKey));
    if (error) {
        const resp = {
            success: false,
            error: error
        }
        return res.json(resp);
    }
    const resp = {
        success: true,
        message: 'Transformed Json data fetched',
        rejectedKeys: `Keys not present in the csv data are : ${result[1]}`,
        result: result[0]
    }
    res.json(resp);
});


module.exports = router;
'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;
//const router = express.Router();
const log = logger('sanitize.index');

let sanitize = (req, res, next) => {
  const payload = req.body;
  //console.log(req.body)
  const sanitized_payload = {};
  log.info("Incoming Headers", JSON.stringify(req.headers));
  log.info("Req Body", JSON.stringify(payload));

  if (payload.lookupKey) {
    sanitized_payload.lookupKey = payload.lookupKey;
  }
  req.payload = sanitized_payload;
  
  next();
}

module.exports = sanitize;


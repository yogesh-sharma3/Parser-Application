const fetch = require('node-fetch');
const config = helper.config;
async function  isAuthorized (req,res, next) {
    const AUTH_URL = `${config.AUTH_URL}/validateToken`
    const token = req.headers['x-auth-token'];
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'No token passed'
        })
    }
    const body = {
        mode: config.AUTH_MODE,
        token: token
    }
    const resp = await fetch(AUTH_URL,{ 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'server-name':config.SERVER_NAME,
            'x-server-token':config.SERVER_TOKEN
        },
        body: JSON.stringify(body)
    });
    const json = await resp.json();
    if(!json.success){
        return res.status(401).json({
            success: false,
            message: json.message
        })
    }
    next();
}
module.exports = isAuthorized;
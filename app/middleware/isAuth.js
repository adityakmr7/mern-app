const jwt  = require('jsonwebtoken');


module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
    
    const token = authHeader.split(" ")[1];
    let tokenDecoded;
    try {
        tokenDecoded = jwt.verify(token, process.env.SECRET)

    }catch(error) {
        error.statusCode = 500;
        throw error;
    }
    if(!tokenDecoded) {
        const error = new Error('UnAuthorized');
        error.statusCode = 500;
        throw error;
    }

    req.userId = tokenDecoded.userId;
    next();

}
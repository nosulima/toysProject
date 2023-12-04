const { decodeToken } = require("../utils/jwt");

const auth = () => {
    
    return function (req, res, next) {
        const token = req.header("x-api-key");
        console.log("in auth");
        if (!token)
            throw new Error('please login');//unauthorized
        try{
        const payload=decodeToken(token);
        console.log(payload);
        console.log('hhhh')
        res.locals.userId=payload?._doc?._id;
        next();
    }
        catch(error){
            next(error);
        }
    }
}
module.exports.auth = auth;
let bcrypt = require('bcrypt');
// Adding JWT Dependencies
const jwt = require('jsonwebtoken')
// get the key from appconfig


const comparePassword = (givenPw,savePw,cb) =>{
    bcrypt.compare(givenPw,savePw,(err,isMatch) => {
        if(err) cb(err)
        cb(null,isMatch)
    })
}

const generateToken = (payload,done) => {
    jwt.sign(payload,'jwtForWipro',{expiresIn:'1h'},done)

}

const varifyToken = (token,done) => {
    jwt.verify(token,'jwtForWipro',done)
}

const isAuthorized =(req,res,next) =>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        res.send(401).json({isAuthorized:false})
    }
    const token = authHeader.replace('Bearer ','');
    varifyToken(token,(err,decoded) =>{
        if(err){
            res.status(401).json({isAuthorized:false})
        }
        else{
            console.log("valid token",decoded);
            req.userId = decoded.userId
            next();
        }
    })
}

module.exports = {
    comparePassword,
    generateToken,
    varifyToken,
    isAuthorized
}
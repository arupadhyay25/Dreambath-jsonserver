require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY =process.env.SECRET_KEY;
const Auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization.split(" ")[1];
        let decode=jwt.verify(token,`${SECRET_KEY}`);
        req.body.userId=decode.userId;
        next();
    }catch(e){
        res.status(401).send({
            "Error":"Not Authorised"
        })
    }
}

module.exports={Auth}
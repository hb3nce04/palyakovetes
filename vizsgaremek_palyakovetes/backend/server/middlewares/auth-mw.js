import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const authorize = (req, res, next) =>{
    const cookie = req.cookies.access_token;

    if(!cookie){
        return res.status(StatusCodes.UNAUTHORIZED).send("no cookie");
    }else{
        jwt.verify(cookie, process.env.JWT_SECRET, (error, decodedToken)=>{
            if(error){
                return res.status(StatusCodes.FORBIDDEN);
            }
                req.user = decodedToken;
                next();
            
        })
    }
}

export default authorize;
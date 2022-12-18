import jwt, { verify } from "jsonwebtoken";

export const verifyToken = async(req, res, next)=>{
    try{
        let token = req.headder("Authorization"); // where the token will be set on the front end

        if(!token){
            return res.status(403).send("Access Denied.") // if token is timmed out
        }
        if(token.startsWith("Baearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next();
    }catch (err){
        res.status(500).json({error: err.message})
    }
}
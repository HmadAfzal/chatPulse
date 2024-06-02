import jwt from 'jsonwebtoken';
import 'dotenv/config'

 export const genJwtToken=(userId,res)=>{
    let token=jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15d'})
    res.cookie('token',token,{
        httpOnly: true, 
    maxAge: 15 * 24 * 60 * 60 * 1000,
    })
    return token
 }
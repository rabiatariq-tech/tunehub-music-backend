const jwt = require('jsonwebtoken')

async function authArtist(req, res, next){
 
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({ message : "Unauthorized" })
     }
try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)  // .verify return data if token is correct otherwise it throws 

    if(decode.role !== "artist"){
        return res.status(403).json({ message : "You don't have access to create a music" })

    }

    req.user = decode;  // this will create a new field in the req body named user which contains the user role and id
    next();
}
    catch(err){
        console.log(err)
        return res.status(401).json({ message : "Unauthorized" })
    }


}

async function authUser(req, res, next){
 
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({ message : "Unauthorized" })
     }

     try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)  // .verify return data if token is correct otherwise it throws 
    
        if(decode.role !== "artist"  &&  decode.role !== "user" ){
            return res.status(403).json({ message : "You don't have access to create a music" })
    
        }
    
        req.user = decode;  // this will create a new field in the req body named user which contains the user role and id
        next();
    }
        catch(err){
            console.log(err)
            return res.status(401).json({ message : "Unauthorized" })
        }

    }

module.exports = {authArtist, authUser}
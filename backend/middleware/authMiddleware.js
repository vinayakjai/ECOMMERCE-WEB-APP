module.exports.authCheck=(req,res,next)=>{
   try{
    console.log(req.cookies)
    const {token}=req.cookies;
    if(!token){
       
        return res.status(401).json({
            err:'user not authenticated',
        })
    }else{
        next()
    }
   }catch(err){
     return res.status(401).json(
       {
        err:'something went wrong while authenticating user'
       }
     )
   }
}



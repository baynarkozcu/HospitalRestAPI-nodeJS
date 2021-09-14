const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        if(req.header("Authorization")){
            const token = req.header('Authorization').replace("Bearer ", "");
            const result = jwt.verify(token, "secretkey");
    
            req.user = result;
            next();
        }else{
            throw new Error("Lütfen Giriş Yapın");
        }


    }catch(error){
        next(error);
    }
}


module.exports = auth;
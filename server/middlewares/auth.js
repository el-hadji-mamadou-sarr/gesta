const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//the local strategy to use to authenticate the user
const authenticateUser = async(email, password, done)=>{
        try{
                //first we get the user by eamil
                const user = await userModel.findOne({email:email});
                
                //if the user dont exist we return false with the message
                if(!user){
                        return done(null, false, {message:"no user found"})
                }
        
                //if the password doesnt match we return false with a message
                if(await bcrypt.compare(password, user.password) ){
                        //at this point the user is authenticated so we pass it to the next middleware
                        return done(null, user, {message:"logged successfully"});   
                }else{
                        return done(null, false, {message: "invalid password"})
                }

        }catch(err){
                return done(err);
        }
        
}


//stratgie d'authetifcation local, vérifie si le user est connecter

const jwtAuthMiddleware = (req, res, next) => {
        try {
                //Recupère le token Jwt du cookie
                const token  = req.cookies.jwtToken;

                //verifie si le token existe
                if(!token) {
                        return res.status(401).json({message: 'Authentification requise'});
                }

                //Vérifie la validité du token 
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                //Ajoute  les données à la requête  pour une utilisation ultèrieure
                req.userData = decoded;

                //passer au prochaine middleware ou route
                next();
        } catch (error) {
                return res.status(401).json({message: 'Authentification échouée'});
        }
};



module.exports.jwtAuthMiddleware = jwtAuthMiddleware;

passport.use( new LocalStrategy( {usernameField: 'email'}, authenticateUser))
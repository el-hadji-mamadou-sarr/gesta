const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/User');
const bcrypt = require('bcrypt');

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

passport.use( new LocalStrategy( {usernameField: 'email'}, authenticateUser))
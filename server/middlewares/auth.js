const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//the local strategy to use to authenticate the user
const authenticateUser = async (email, password, done) => {
        try {
                //first we get the user by eamil
                const user = await userModel.findOne({ email: email });

                //if the user dont exist we return false with the message
                if (!user) {
                        return done(null, false, { message: "no user found" })
                }

                //if the password doesnt match we return false with a message
                if (await bcrypt.compare(password, user.password)) {
                        //at this point the user is authenticated so we pass it to the next middleware
                        return done(null, user, { message: "logged successfully" });
                } else {
                        return done(null, false, { message: "invalid password" })
                }

        } catch (err) {
                return done(err);
        }

}

// verify the token
const authenticatedRequest = async (jwtPayload, done) => {

        try {
                const user = await userModel.findOne({ email: jwtPayload.email })
                if (!user) {
                        return done(null, false, { message: "cet utilisateur n'est pas connecté" });
                }

                return done(null, user);
        } catch (error) {
                return done(err);
        }
}

// cookie extractor function from www.passportjs.org

var cookieExtractor = function (req) {
        var token = null;
        if (req && req.cookies) {
                token = req.cookies['jwtToken'];
        }
        return token;
};

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([req => cookieExtractor(req)]),
        secretOrKey: process.env.JWT_SECRET
},
        authenticatedRequest
));




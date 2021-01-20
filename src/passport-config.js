const LocalStartegy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

function inicialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done)=>{
        //getting user
        const user = await User.findOne({email:email});

        //checking user in data base
        if (user==null) {
            return done(null, false, {message:"invalid user"});
        }


        //try login
        try {

            //checking password
            
            if (await bcrypt.compare(password, user.pass)) {
                return done(null,user);
            }else{
                return done(null,false,{message:"incorrect password"});
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStartegy(authenticateUser));
    
    //log in
    passport.serializeUser((user, done)=> done(null, user.id));
    
    //log out
    passport.deserializeUser(async (id, done)=> {
        const {email} = await User.findOne({id:id});
        const userInfo ={email}
        done(null, userInfo)
    });
}

module.exports = inicialize;
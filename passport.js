const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const {JWT_SECRET} = require('./configuration');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

// JSON web token strategy
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	try{
		// find the user specified in signToken
		const user = await User.findById(payload.sub);

		//if user doesnt exist, handle it
		if (!user){
			return done(null, false);
		}

		// otherwise, return user
		done(null, user);
	}catch(err){
		done(error, false);
	}
}));

// local Strategy
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) =>{
	try{
		// find the user given the Email
		const user = await User.findOne({email});

		// if not, handle interval
		if (!user){
			return done(null,false);
		}

		// check if password is correct
		const isMatch = await user.isValidPassword(password);

		// if not, handle
		if (!isMatch){
			return done(null, false);
		}

		// return user
		return done(null, user);
	}catch(err){
		done(err, false);
	}

}));

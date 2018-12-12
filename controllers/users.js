const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration');

signToken = user => {
	return token = JWT.sign({
		iss: 'server-assign',
		sub: user.id,
		iat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 1)
	}, JWT_SECRET);
}

module.exports = {
	signUp: async(req, res, next) =>{
		const { email, password } = req.value.body;

		// check if user already with same email
		const foundUser = await User.findOne({ email });
		if (foundUser){
			return res.status(403).send({error: 'Email already used ' + email});
		}

		// create new user
		const newUser = new User({ email, password });
		await newUser.save();

		//generate signToken
		const token = signToken(newUser);

		// respond with token
		res.status(200).json({ token });
	},
	signIn: async(req, res, next) =>{
		const token = signToken(req.user);
		res.status(200).json({token});
		console.log('successful login');
	},
	secret: async(req, res, next) =>{
		console.log('managed to get here');
		res.json({secret: "resource"});
	}
}

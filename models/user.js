const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//create schemas
const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.pre('save', async function(next){
	try{
		// generate a salt
		const salt = await bcrypt.genSalt(10);

		// generate password hash ( salt + hash )
		const passwordHash = await bcrypt.hash(this.password, salt);

		// reassign original pass
		this.password = passwordHash;
		next();
	}catch(err){
		next(err);
	}
});

userSchema.methods.isValidPassword = async function(newPassword){
	try{
		return await bcrypt.compare(newPassword, this.password);
	}catch(err){
		throw new Error(err);
	}
}

//create model
const User = mongoose.model('user', userSchema);

//export model
module.exports = User;

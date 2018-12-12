const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas} = require('../helpers/routeshelpers');
const UsersController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');
const passportSignIn = passport.authenticate('local', {session:false});
const passportJWT = passport.authenticate('jwt', {session: false});

router.route('/signup')
	.post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
	.post(validateBody(schemas.authSchema), passportSignIn , UsersController.signIn);

router.route('/secret')
	.get(passportJWT, UsersController.secret);

module.exports = router;

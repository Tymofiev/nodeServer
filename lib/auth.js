const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ login: username, password: password })
			.then((user) => {
				if (!user) {
					return done(null, false, { message: 'Incorrect login.' })
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' })
				}
				return done(null, user)
			})
			.catch((err) => {
				return done(err)
			})
	}),
)

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
}

passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		console.log('---', jwt_payload)

		User.findOne({ login: jwt_payload.login }).then((user) => {
			return done(null, user)
		})
	}),
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}

	res.redirect('/login')
}

module.exports = { passport, isAuth }

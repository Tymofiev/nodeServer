const express = require('express')
const jwt = require('jsonwebtoken')

const { passport, isAuth } = require('../lib/auth')

const router = express.Router()

router.get('/', (req, res) => {
	res.send('Home')
})

router.post('/login', (req, res) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Something is not right',
				user: user,
			})
		}

		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err)
			}

			const token = jwt.sign(user.toJSON(), 'secret')
			return res.json({ user, token })
		})
	})(req, res)
})

router.get('/numbers', (req, res) => {
	res.setTimeout(3000, () =>
		res.send({
			data: [2, 256, 356, 23, 438, 13, 1, 6, 9, 13, 40],
		}),
	)
})

router.get('/logout', function(req, res) {
	req.logout()
	res.redirect('/login')
})

module.exports = router

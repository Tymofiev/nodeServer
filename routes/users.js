const express = require('express')
const client = require('../client')
const mongoose = require('mongoose')
const User = require('../models/User')

const router = express.Router()

router.get('/', (req, res) => {
	User.find()
		.then((result) => res.send(result))
		.catch((e) => res.send(e.message))
})

router.post('/', (req, res) => {
	const { login, password } = req.body

	let user = new User({ login: login, password: password })

	user
		.save()
		.then((result) => {
			res.send(result)
		})
		.catch((e) => {
			res.send(e.message)
		})
})

router.post('/login', (req, res) => {
	let { login, password } = req.body
	let exists = false

	User.findOne({ login, password }).then((result) => {
		if (result !== null) {
			exists = true
		}
		res.send(exists)
	})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	User.findOne({ _id: id }).then((result) => {
		res.json(result)
	})
})

module.exports = router

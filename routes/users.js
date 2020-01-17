const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/', (req, res) => {
	User.find()
		.then((result) => res.send(result))
		.catch((e) => res.send(e.message))
})

router.post('/', (req, res) => {
	const { login, password, posts } = req.body

	let user = new User({ login: login, password: password, posts: posts })

	user
		.save()
		.then((result) => {
			res.send(result)
		})
		.catch((e) => {
			res.send(e.message)
		})
})

router.post('/:id/addPost', (req, res) => {
	const { id } = req.params
	const { postId } = req.body

	User.updateOne({ _id: id }, { $push: { posts: { _id: postId } } })
		.then((result) => {
			res.send(result)
		})
		.catch((e) => {
			res.send(e.message)
		})
})

router.post('/:id/deletePost', (req, res) => {
	const { id } = req.params
	const { postId } = req.body

	User.updateOne({ _id: id }, { $pull: { posts: { _id: postId } } })
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

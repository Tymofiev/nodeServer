const express = require('express')
const User = require('../models/User')
const router = express.Router()

//GET ALL USERS AND USER BY ID
router.get('/', (req, res) => {
	User.find()
		.then((result) => res.send(result))
		.catch((e) => res.send(e.message))
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	User.findOne({ _id: id }).then((result) => {
		res.json(result)
	})
})

//REGISTER AND LOGIN
router.post('/register', (req, res) => {
	const { login, password, posts } = req.body

	User.findOne({ login: login }).then((result) => {
		if (!result) {
			let user = new User({ login: login, password: password, posts: posts })

			user
				.save()
				.then(() => {
					res.send(false)
				})
				.catch((e) => {
					res.send(e.message)
				})
		} else {
			res.send(true)
		}
	})
})

router.post('/login', (req, res) => {
	let { login, password } = req.body
	let exists = false

	User.findOne({ login, password }).then((result) => {
		if (result) {
			exists = true
		}
		res.send(exists)
	})
})

//ADD AND DELETE POSTS OF A USER
router.post('/:id/addPost', (req, res) => {
	const { id } = req.params
	const { postId } = req.body

	if (postId) {
		User.updateOne({ _id: id }, { $push: { posts: { _id: postId } } })
			.then((result) => {
				res.send(result)
			})
			.catch((e) => {
				res.send(e.message)
			})
	} else {
		res.status(404).send('Post id wasnt specified')
	}
})

router.post('/:id/deletePost', (req, res) => {
	const { id } = req.params
	const { postId } = req.body

	if (postId) {
		User.updateOne({ _id: id }, { $pull: { posts: { _id: postId } } })
			.then((result) => {
				res.send(result)
			})
			.catch((e) => {
				res.send(e.message)
			})
	} else {
		res.status(404).send('Post id wasnt specified')
	}
})

module.exports = router

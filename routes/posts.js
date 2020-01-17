const express = require('express')
const Post = require('../models/Post')

const router = express.Router()

router.get('/', (req, res) => {
	Post.find()
		.then((result) => res.send(result))
		.catch((e) => res.send(e.message))
})

router.post('/', (req, res) => {
	const { title, body, date, categories } = req.body

	let post = new Post({
		title: title,
		body: body,
		date: date,
		categories: categories,
	})

	post
		.save()
		.then((result) => {
			res.send(result)
		})
		.catch((e) => {
			res.send(e.message)
		})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	Post.findOne({ _id: id })
		.then((result) => {
			res.json(result)
		})
		.catch((e) => res.send(e.message))
})

module.exports = router

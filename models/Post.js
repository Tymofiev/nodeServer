const mongoose = require('mongoose')

let PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		categories: [
			{
				name: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ collection: 'posts' },
)

module.exports = mongoose.model('Post', PostSchema)

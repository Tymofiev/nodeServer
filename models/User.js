const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
				},
			},
		],
	},
	{ collection: 'users' },
)

module.exports = mongoose.model('User', UserSchema)

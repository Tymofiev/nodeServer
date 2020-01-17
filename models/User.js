const mongoose = require('mongoose')

//SPECIFYING USER SCHEMA
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

//EXPORTING SCHEMA
module.exports = mongoose.model('User', UserSchema)

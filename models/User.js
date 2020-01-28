const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')

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

UserSchema.methods.validPassword = () => {
	return true
}

//EXPORTING SCHEMA
module.exports = mongoose.model('User', UserSchema)

const config = require('config')
const mongoose = require('mongoose')

const connection = config.get('db')

mongoose
	.connect(connection, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => console.log('Connected'))
	.catch((e) => console.log(e.reason))

module.exports = mongoose.connection

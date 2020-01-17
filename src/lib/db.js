const config = require('config')
const mongoose = require('mongoose')

//GETTING COMECTION STRING FROM CONFIG
const connection = config.get('db')

//CONNECTING TO THE DATABASE
mongoose
	.connect(connection, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => console.log('Connected'))
	.catch((e) => console.log(e.reason))

module.exports = mongoose.connection

const config = require('config')
const mongoose = require('mongoose')

const connection = config.get('db')

mongoose.connect(connection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

let db = mongoose.connection

db.once('open', () => {
	console.log('Connected')
})

module.exports = db

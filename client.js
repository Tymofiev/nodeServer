const { MongoClient } = require('mongodb')

const uri =
	'mongodb+srv://tymofiev:tymofiev@mycluster-tcazw.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// client.connect((err) => {
// 	console.log('Connected')

// 	const collection = client.db('login_form').collection('users')
// 	collection.findOne({ login: 'login' }).then((result) => console.log(result))
// 	client.close()
// })

module.exports = client

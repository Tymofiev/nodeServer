const express = require('express')
const bodyParser = require('body-parser')

const db = require('../server/src/lib/db')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const app = express()

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Content-Type',
	})
	next()
})

app.use(bodyParser.json())
app.use('/users', usersRoute)
app.use('/posts', postsRoute)

app.get('/', (req, res) => {
	res.send('Home page')
})

app.listen(3001, console.log('Listening on port 3001...'))

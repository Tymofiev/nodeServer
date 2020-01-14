const express = require('express')
const { engine } = require('express-edge')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

const db = require('../server/src/lib/db')
const usersRoute = require('./routes/users')
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

app.get('/', (req, res) => {
	// res.render('index', {
	// 	usernames: ['1', '2', '3'],
	// 	users: users,
	// 	env: process.env.NODE_ENV,
	// })
	res.send('Home page')
})

app.listen(3001, console.log('Listening on port 3001...'))

//app.use(engine)
//app.set('views', `${__dirname}/views`)

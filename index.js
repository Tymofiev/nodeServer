const express = require('express')
const bodyParser = require('body-parser')

//IMPORTING ALL REQUIRED FILES
const db = require('../server/src/lib/db')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const app = express()

//ALLOW ALL METHODS(DOESNT WORK WITHOUT IT, IDK)
app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Content-Type',
	})
	next()
})

app.use(bodyParser.json())

//TELLING WHERE TO GO IN /USERS AND /POSTS CASES
//USING ROUTES FROM ANOTHER FILES
app.use('/users', usersRoute)
app.use('/posts', postsRoute)

//JUST HOME, THERE IS NO PLACE LIKE HOME
app.get('/', (req, res) => {
	res.send('Home page')
})

//WHAT PORT TO USE
app.listen(3001, console.log('Listening on port 3001...'))

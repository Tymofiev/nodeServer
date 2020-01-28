const express = require('express')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('../server/src/lib/db')
const routes = require('./routes/index')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

const commonRoute = require('./routes/common')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const apiRoute = require('./routes/api')

app.use('/', commonRoute)
app.use('/api', apiRoute)
app.use('/users', usersRoute)
app.use('/posts', postsRoute)

app.listen(3001, console.log('Listening on port 3001...'))

process.on('unhandledRejection', (error) => {
	console.log(error)
})

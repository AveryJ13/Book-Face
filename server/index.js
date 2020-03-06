require('dotenv').config()

const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    controller = require('./controller'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env


const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookiee: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('database enabled')
    var io = require('socket.io')(app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`)))
    io.on('connection', function (socket) {
        console.log('a user is connected')
        socket.on('chat message', function (msg) {
            console.log('message: ' + JSON.stringify(msg))
            io.emit('chat message', msg)
        })
    })
})



//endpoints
app.post('/api/auth/register', controller.register)
app.post('/api/auth/login', controller.login)
app.get('/api/dashboard', controller.getPosts)
app.get('/api/indiv/:id', controller.getIndividual)
app.get('/api/user', controller.getUserInfo)
app.get('/api/userposts', controller.getUserPosts)
app.get('/api/author/:id', controller.getAuthor)
app.post('/api/addPost', controller.addPost)
app.get('/api/checkUser', controller.checkUser)
app.post('/api/logout', controller.logout)
app.delete('/api/delete/:id', controller.deletePost)
app.put('/api/edit/:id', controller.editPost)



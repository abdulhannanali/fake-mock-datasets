const express = require('express')
const jsonServer = require('json-server')

const serverData = require('./json-server/index.js')()

const jsonRouter = jsonServer.router(serverData)

const app = express()

app.use(jsonServer.defaults())
app.use(jsonServer.bodyParser)
app.use(jsonRouter)

app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', function (error) {
    if (!error) {
        console.log('server is listening')
    }
})
const express = require('express')
const jsonServer = require('json-server')
const cache = require('apicache').options({debug:true}).middleware
const bodyParser = require('body-parser')

const serverData = require('./json-server/index.js')()

const jsonRouter = jsonServer.router(serverData)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(jsonServer.defaults())

app.use((req, res, next) => {
    setInterval(function () {
        console.log(req)
    }, 100)
})
app.use(jsonRouter)

app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', function (error) {
    if (!error) {
        console.log('server is listening')
    }
})
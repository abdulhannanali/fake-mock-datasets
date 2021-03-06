const express = require('express')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const redis = require('redis')
const multer = require('multer')

const REDIS_URL = process.env.REDIS_URL
const redisClient = redis.createClient(REDIS_URL)
const serverData = require('./json-server/index.js')()
const upload = multer({ dest: 'uploads/' })

const jsonRouter = jsonServer.router(serverData)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(jsonServer.defaults())
app.use(jsonRouter)

app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', function (error) {
    if (!error) {
        console.log('server is listening')
    }
})
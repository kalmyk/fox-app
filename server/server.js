'use strict'

const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const authRouter = require('./auth/router.express').router
const PORT = process.env.PORT || 9009

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  // .use(express.bodyParser())
  .use('/auth/v1/', authRouter)
  .use(express.static(path.join(__dirname, '../resources')))
  .use(passport.initialize())
  .use(passport.session())

const httpServer = http.createServer(app)
httpServer.listen(PORT, () => console.log(`Listening on ${PORT}`))

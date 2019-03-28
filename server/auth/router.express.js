'use strict'

var express = require('express')
var router = express.Router()
var { generateToken, sendToken } = require('./token.utils')
var passport = require('passport')

var GoogleTokenStrategy = require('passport-google-token').Strategy

var config = require('../key.config')

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: 'http://localhost:9000/auth/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log('***************', profile.emails);
      return done(undefined, { id: profile.id, email: profile.emails[0].value })
      //   User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
      //       return done(err, user);
      //   });
    }
  )
)

let connector

function defineConnector (newConnector) {
  connector = newConnector
}

router.route('/google').post(
  passport.authenticate('google-token', {
    session: false
    // successRedirect:'/',
    // failureRedirect: '/login'  -- sent to client better url
  }),
  function (req, res, next) {
    console.log('AUTH-OK!', req.user)

    if (!req.user) {
      return res.send(401, 'User Not Authenticated')
    }

    req.auth = {
      id: req.user.id
    }

    connector.userLogin(req.user)

    next()
  },
  generateToken,
  sendToken
)

module.exports.router = router
module.exports.defineConnector = defineConnector

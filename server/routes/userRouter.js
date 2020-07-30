/* eslint-disable function-paren-newline */
const express = require('express');

const UserController = require('../controllers/UserController.js');
const CookieController = require('../controllers/CookieController.js');
const SessionController = require('../controllers/SessionController.js');

const router = express.Router();

// GET all items that user has posted
router.get('/:user_id', UserController.getUserItems, (req, res) => {
  console.log('res.locals.items', res.locals.items);
  res.status(200).json({ allItems: res.locals.items });
});

// POST request to add user
router.post(
  '/signup',
  UserController.createUser,
  CookieController.setSSIDCookie,
  SessionController.startSession,
  (req, res, next) => {
    return res
      .status(200)
      .json({ user_id: res.locals.newUserId, id: res.locals.ssid });
  }
);

// handle login requests
router.post(
  '/login',
  UserController.verifyUser,
  CookieController.setSSIDCookie,
  SessionController.startSession,
  (req, res) => {
    return res.status(200).json({ isLoggedIn: true });
  });

// check for session on componentDidMount
router.get('/checksession', SessionController.isLoggedIn, (req, res) => {
  // If isLoggedIn middleware could not find a matching session ID in our database
  if (res.locals.notLoggedIn) {
    // This user does not have their ssid cookie set, so redirect to login
    return res.status(200).redirect('/login');
  }
  // Provide client with existing user's email
  return res.status(200).json({ email: res.locals.email, userId: res.locals.user_id });
});

// handle logout requests
router.post('/logout', SessionController.endSession, (req, res) => {
  return res.status(200).json({ msg: 'ended session' });
});

module.exports = router;

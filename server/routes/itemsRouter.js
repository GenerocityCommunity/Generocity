/* eslint-disable function-paren-newline */
const express = require('express');

const ItemsController = require('../controllers/ItemsController.js');

const router = express.Router();


// GET all items 
router.get('/all', ItemsController.getAllItems, (req, res, next) => {
  res.status(200).json(res.locals);
});

// POST single item
// need user_id in req.body
router.post('/add', ItemsController.postItem, (req, res, next) => {
  res.status(200).json({});
});

// EDIT single item that user has posted
router.patch('/:item_id', ItemsController.editUserItem, (req, res, next) => {
  res.send(200);
});

// DELETE single item that user has posted
router.delete('/:item_id', ItemsController.deleteItem, (req, res, next) => {
  res.send(200);
})

module.exports = router;
/* eslint-disable function-paren-newline */
const express = require('express');

const FilterController = require('../controllers/FilterController.js');

const router = express.Router();


//***** STRETCH FEATURES *****//
router.get('/:column/:filterBy', FilterController.filterByCategory, (req, res, next) => {
  res.status(200).json(res.locals);
})


module.exports = router;
const db = require('../models/Models');

const FilterController = {};

FilterController.filterByCategory = (req, res, next) => {
  const { filterBy } = req.params;
  if (filterBy === 'AllItems') {
    const query = `SELECT *
                   FROM public.items`;
    db.query(query, (err, data) => {
      if (err) {
        console.log('ERROR: ', err);
        return next(err);
      }
      const { rows } = data;
      res.locals.items = rows;
      return next();
    });
  } else {
    const query = `SELECT *
                   FROM public.items
                   WHERE category=$1`;
    const queryParams = [filterBy];

    db.query(query, queryParams, (err, data) => {
      if (err) {
        console.log('ERROR: ', err);
        return next(err);
      }
      // if successful, query will filter by category (determined by front-end)
      // and return list of filtered items
      const { rows } = data;
      res.locals.items = rows;
      return next();
    });
  }
};

module.exports = FilterController;

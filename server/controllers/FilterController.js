const db = require('../models/Models');

const FilterController = {};

FilterController.filterByCategory = (req, res, next) => {
  const { column, filterBy } = req.params;

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
    console.log('rows', data.rows);
    const { rows } = data;
    res.locals.items = rows;
    return next();
  });
};

module.exports = FilterController;

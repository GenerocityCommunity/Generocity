const db = require('../models/Models');

const FilterController = {};

FilterController.filterByCategory = (req, res, next) => {
  const { column, filterBy } = req.params;

  const query = `
  SELECT * FROM public.items
  WHERE ${column}='${filterBy}'`

  db.query(query, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
    }
    // if successful, query will filter by category (determined by front-end) and return list of filtered items
    console.log('rows', data.rows);
    const { rows } = data;
    res.locals.items = rows;
    console.log(`Successfully made GET request for all items filtered by: ${filterBy}.`);
    return next();
  })
}


module.exports = FilterController;
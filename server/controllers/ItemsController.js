const db = require('../models/Models');

const ItemsController = {};

ItemsController.getAllItems = (req, res, next) => {
  const query = `SELECT * 
                 FROM public.items`;

  db.query(query, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      return next(err);
    }
    // if successful, query will return data.rows
    const { rows } = data;
    res.locals.items = rows;
<<<<<<< HEAD
    // console.log('res.locals.items', res.locals.items);
=======
>>>>>>> 7b95718aefd6bf714585d986ba816182bfb48b5f
    return next();
  });
};

ItemsController.postItem = (req, res, next) => {
  const { title, description, image, category, status, user_id } = req.body;
  let item_latitude;
  let item_longitude;

  // query db to add latitude and longitude to each item
<<<<<<< HEAD
  const queryForCoords = `
  SELECT u._id as user_id, a._id as address_id, a.latitude, a.longitude, u."firstName", u.email
  FROM public.users u
  JOIN public.address a ON u.address_id = a._id
  WHERE u._id = ${user_id}
  `;

  db.query(queryForCoords, (err, data) => {
=======
  const coordinatesQuery = {
    text: `SELECT u._id as user_id, a._id as address_id, a.latitude, a.longitude, u."firstName", u.email
           FROM public.users u
           JOIN public.address a ON u.address_id = a._id
           WHERE u._id = $1`,
    values: [user_id],
  };

  db.query(coordinatesQuery, (err, data) => {
>>>>>>> 7b95718aefd6bf714585d986ba816182bfb48b5f
    if (err) {
      console.log('ERROR: ', err);
      return next(err);
    }
    // log latitude and longitude and insert into create item below
    item_latitude = data.rows[0].latitude;
    item_longitude = data.rows[0].longitude;

    // after retrieving item longitude and latitude from joining address and users table
    // create new item in db with item latitude and item longitude values
    const query = {
      text: `INSERT INTO public.items(title, description, image, category, status, user_id, item_latitude, item_longitude)
               VALUES($1, $2, $3, $4, $5, $6, $7, $8)
               RETURNING *`,
      values: [
        title,
        description,
        image,
        category,
        status,
        user_id,
        item_latitude,
        item_longitude,
      ],
    };

    db.query(query, (err, data) => {
      if (err) {
        console.log('ERROR: ', err);
        return next(err);
      }
      console.log(`${title} successfully posted to database.`);
      return next();
    });
  });
};

ItemsController.editUserItem = (req, res, next) => {
  const { item_id } = req.params;
  const { title, description, image, category, status } = req.body;

  const query = `UPDATE public.items
                 SET title=$1,
                     description=$2,
                     image=$3,
                     category=$4,
                     status=$5
                 WHERE _id=$6`;
  const queryParams = [title, description, image, category, status, item_id];

  db.query(query, queryParams, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      return next(err);
    }
    // if successful, query will edit single item in database
    console.log(`Item Number ${item_id} successfully edited in database.`);
    return next();
  });
};

ItemsController.deleteItem = (req, res, next) => {
  const { item_id } = req.params;

  const query = `DELETE FROM public.items
                 WHERE _id=$1`;
  const queryParams = [item_id];

  db.query(query, queryParams, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      return next(err);
    }
    // if successful, query will delete single item in database
    console.log(`Item Number ${item_id} successfully deleted in database`);
    return next();
  });
};

module.exports = ItemsController;

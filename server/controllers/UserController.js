const db = require('../models/Models');
const bcrypt = require('bcrypt');

const UserController = {};

UserController.getUserItems = (req, res, next) => {
  const { user_id } = req.params;

  const query = `SELECT u._id, u.email, I.*
                 FROM public.users u
                 RIGHT OUTER JOIN public.items i ON u._id=i.user_id
                 WHERE u._id=$1`;
  const queryParams = [user_id];

  db.query(query, queryParams, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      return next(err);
    }
    // if successful, query will return list of itmems that user has posted
    const { rows } = data;
    res.locals.items = rows;
    console.log(
      'Successfully made GET request for all items that user has posted.'
    );
    return next();
  });
};

UserController.createUser = async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    zipCode,
    street,
    city,
    state,
  } = req.body;
  let hashedPassword;
  // Generate a salt with 10 rounds then hash
  bcrypt.hash(password, 10, (err, hash) => {
    hashedPassword = hash;
  });
  try {
    // if user is in database, send res of user exists
    const findUser = `SELECT email, password
                      FROM users
                      WHERE (email = $1);`;
    const queryParams = [email];

    const userData = await db.query(findUser, queryParams);
    const user = userData.rows[0];
    if (user) {
      return res.status(200).send(`${email} already exists`);
    }

    // create address in db
    const createAddressQuery = {
      text: `INSERT INTO public.address(zipcode, street, city, state)
             VALUES($1, $2, $3, $4)
             RETURNING *`,
      values: [zipCode, street, city, state],
    };
    const address = await db.query(createAddressQuery);

    // create user, use incoming address_id
    const createUserQuery = {
      text: `INSERT INTO public.users("email", "firstName", "lastName", "password", "address_id")
             VALUES($1, $2, $3, $4, $5)
             RETURNING *`,
      values: [email, firstName, lastName, hashedPassword, address.rows[0]._id],
    };

    await db.query(createUserQuery);

    return next();
  } catch (e) {
    return next(e);
  }
};

UserController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findUser = `SELECT _id, email, password
                      FROM users
                      WHERE (email = $1);`;
    const queryParams = [email];

    const userData = await db.query(findUser, queryParams);
    const user = userData.rows[0];
    res.locals.loggedIn = false;
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return next(err);
      }
      if (result === true) {
        console.log(
          '/ * * * * * * * * * * * * * * USER SUCCESSFULLY LOGGED IN * * * * * * * * * * * * * * /'
        );
        res.locals.loggedIn = true;
        res.locals.user = user;
        return next();
      }
      if (result === false) {
        return next({ log: 'Incorrect password' });
      }
    });
  } catch (e) {
    // Changed 'invalid username' to 'invalid email'
    return next({ log: 'Error returned, invalid email', error: e });
  }
};

module.exports = UserController;

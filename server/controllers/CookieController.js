const bcrypt = require('bcrypt');
const db = require('../models/Models');

const CookieController = {};
const EXPIRY_IN_MS = 2592000;

CookieController.setSSIDCookie = async (req, res, next) => {
  const { email } = req.body;

  try {
    /*
     * READ FROM USERS TABLE
     *
     * Note: Given that `setSSIDCookie` only gets invoked _after_ we've created or verified a user,
     *       we can safely assume that there exists a user in Users table with the given email
     *       in our request body
     *
     * 1. Construct a SELECT query for the unique user in Users table based on given email address
     * 2. Safely interpolate user input into query string
     * 3. Pause execution of setSSIDCookie to `await` for `query`'s returned promise to resolve
     * 4. Once resolved, store data from query promise (an array of at most 1 object) into `user`
     */
    const findUser = `SELECT _id, email, password
                      FROM users
                      WHERE (email = $1);`;
    const queryParams = [email];

    const userData = await db.query(findUser, queryParams);

    /*
     * SET COOKIE WITH A SESSION ID FOR THIS USER
     *
     * 1. Check that User table data retrieval was successful
     *    (if DB error, invoke global middleware)
     * 2. Tell client/browser to set user's cookie for this domain with key value pair:
     *    `ssid: <user row ID>`
     * 3. Pass the value we set our user's cookie property, `ssid` to next middleware
     */
    if (userData) {
      // NOTE: Since we filtered by `email` (a UNIQUE column) in our SELECT query, we only expect
      //       1 object in the `rows` array of our `userData` object returned by that query
      const user = userData.rows[0];

      let hashedSessionId;
      bcrypt.hash(String(user._id), 10, (err, hash) => {
        if (err) {
          return next(err);
        }

        hashedSessionId = hash;
        res.cookie('ssid', hashedSessionId, { httpOnly: true, maxAge: EXPIRY_IN_MS });
        res.locals.ssid = hashedSessionId;
        res.locals.userId = user._id;
        return next();
      });
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = CookieController;

const db = require('../models/Models');

const CookieController = {};

// getUserByEmail

CookieController.setSSIDCookie = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findUser = `SELECT _id, email, password FROM users WHERE (email = '${email}');`;
    const user = await db.query(findUser);
    // console.log('user.rows', user.rows);

    if (user) {
      res.cookie('ssid', user.rows[0]._id, { httpOnly: true });
      res.locals.ssid = user.rows[0]._id;
      // console.log('res.locals', res.locals);
      return next();
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = CookieController;

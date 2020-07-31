const db = require('../models/Models');

const SessionController = {};
const EXPIRY_IN_MS = 2592000;

/**
 * startSession - create and ave a new Session into the database.
 */

SessionController.startSession = async (req, res, next) => {
  const createSessionQuery = {
    text: `INSERT INTO public.sessions("cookie", "created_At", "expiration", "user_id")
           VALUES($1, current_timestamp, $2, $3)
           RETURNING *`,
    values: [res.locals.ssid, EXPIRY_IN_MS, res.locals.userId],
  };

  try {
    await db.query(createSessionQuery);
    console.log(`SessionController: Created session with ssid ${res.locals.ssid} successfully`);
    return next();
  } catch (e) {
    return next({ log: 'Invalid startSession query', error: e });
  }
};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
SessionController.isLoggedIn = async (req, res, next) => {
  // query database for cookie ssid
  const { ssid } = req.cookies;
  if (!ssid) {
    console.log('SessionController: No ssid in cookie given by client request!!!');
    return next();
  }

  try {
    // Check if this ssid exists in in any Session table row's cookie column
    // (Should return 1 row per unique user given our setSSIDCookie logic)
    const sessionQuery = {
      text: `SELECT * 
             FROM public.sessions
             WHERE cookie = $1`,
      values: [ssid],
    };
    const sessionData = await db.query(sessionQuery);
    // If we found an existing session
    if (sessionData.rows.length) {
      console.log('SessionController: Found a Sessions row corresponding with the given SSID cookie!');
      try {
        // Return all rows from sessions table and only the matched rows from users
        const sessionUserQuery = {
          text: `SELECT u.*, s.*
                 FROM public.users u
                 RIGHT OUTER JOIN public.sessions s
                 ON u._id = s.user_id
                 WHERE (s.cookie = $1)`,
          values: [ssid],
        };

        const sessionAndUserData = await db.query(sessionUserQuery);
        res.locals.email = sessionAndUserData.rows[0].email;
        res.locals.user_id = sessionAndUserData.rows[0].user_id;
        res.locals.firstName = sessionAndUserData.rows[0].firstName;
        res.locals.lastName = sessionAndUserData.rows[0].lastName;
        res.locals.address_id = sessionAndUserData.rows[0].address_id; // TODO: do we need this?
        return next();
      } catch (err) {
        console.log('SessionController: Error querying for user and session data!');
        return next(err);
      }
    } else {
      console.log('SessionController: Session row for given SSID not found!');
      res.locals.email = null;
      res.locals.notLoggedIn = true;
      return next();
    }
  } catch (err) {
    console.log('SessionController: Error querying for ssid in Sessions table!');
    return next(err);
  }
};

// /**
//  * endSession - delete user session.
//  */

SessionController.endSession = async (req, res, next) => {
  const { ssid } = req.cookies;
  if (!ssid) {
    return next({ log: `SessionController: Tried to delete nonexistent SSID cookie: ${ssid}` });
  }

  try {
    const deleteSessionQuery = {
      text: `DELETE
             FROM public.sessions
             WHERE (cookie = $1)`,
      values: [ssid],
    };

    const session = await db.query(deleteSessionQuery);
    console.log(`SessionController: Deleted session successfully (ID ${ssid})`, session);
    return next();
  } catch (e) {
    return next({ log: 'SessionController: Error querying to delete from Sessions table!' });
  }
};

module.exports = SessionController;

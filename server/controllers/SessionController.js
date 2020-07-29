const db = require('../models/Models');

const SessionController = {};
/**
 * startSession - create and ave a new Session into the database.
 */

SessionController.startSession = async (req, res, next) => {
  const createSessionQuery = {
    text: `INSERT INTO public.sessions("cookie", "created_At", "expiration", "user_id")
           VALUES($1, current_timestamp, $2, $3)
           RETURNING *`,
    values: [res.locals.ssid, 500000, res.locals.ssid],
  };

  try {
    const session = await db.query(createSessionQuery);
    console.log('session created successfully', session);
    return next();
  } catch (e) {
    return next({ log: 'Invalid startSession query' });
  }
};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
SessionController.isLoggedIn = async (req, res, next) => {
  // query database for cookie ssid *SSID is also the mongoose ID
  const { ssid } = req.cookies;

  const sessionJoinQuery = `SELECT u.*, s.*
                            FROM public.users u
                            RIGHT OUTER JOIN public.sessions s
                            ON u._id = s.user_id
                            WHERE (s.cookie = $1)`;
  const queryParams = [ssid];

  try {
    const sessionJoin = await db.query(sessionJoinQuery, queryParams);
    console.log('sessionjoin', sessionJoin.rows);
    res.locals.email = sessionJoin.rows[0].email;
    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = SessionController;

// // // console.log("req.cookies.ssid in isLoggedIn", req.cookies.ssid)
// // // check whether ssid exists in database
// // Session.findOne({ cookieId: ssid }, (err, data) => {
// //   if (err) return next({ log: 'Error finding session in DB with provided SSID' });
// //   // no session found, redirect to signup
// //   // console.log('return data in isLoggedIn/session.findOne:', data)
// //   if (data === null)
// //     return next({ log: 'Cannot find session from provided SSID - user may be logged out' });
// //   // if session is found, find user in DB
// //   User.findById(ssid, (err, found) => {
// //     if (err) return next({ log: 'Error finding USER with provided SSID' });
// //     // console.log('User is logged in. User data: ', found);
// //     // store user email on res.locals.email
// //     res.locals.email = found.email;
// //     // move onto next middleware - which will send 200 and res.locals to client
// //     return next();
// //   });
// // });

// // // set cookieID to user ID
// // console.log('in startSession res.locals.ssid', res.locals.ssid);
// // Session.create({ cookieId: res.locals.ssid }, (err, data) => {
// //   if (err) return next({ log: 'Invalid startSession query' });
// //   console.log('Session data in startSession: ', data);
// //   return next();
// // });
// /**
//  * endSession - delete user session.
//  */

// // SessionController.endSession = async (req, res, next) => {
// //   const { ssid } = req.cookies;
// //   console.log('ssid', ssid);
// //   const deleteSessionQuery = `DELETE FROM public.sessions WHERE (cookie = '${ssid}')`;

// //   try {
// //     const session = await db.query(createSessionQuery);
// //     console.log(`deleted ${ssid}`, session);
// //     return next();
// //   } catch (e) {
// //     return next({ log: 'error in endsession middleware' });
// //   }
// // };

// //   // Session.deleteOne({ cookieId: ssid }, (err, data) => {
// //   //   if (err) return next({ log: 'Invalid endSession query' });
// //   //   return next();
// //   // });
// // };

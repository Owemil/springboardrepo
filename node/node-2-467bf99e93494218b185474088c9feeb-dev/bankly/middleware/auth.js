/** Middleware for handling req authorization for routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../helpers/expressError');

/** Authorization Middleware: Requires user is logged in. */

function requireLogin(req, res, next) {
  try {
    if (req.curr_username) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authorization Middleware: Requires user is logged in and is staff. */

function requireAdmin(req, res, next) {
  try {
    if (req.curr_admin) {
      return next();
    } else {
      return next({ status: 401, message: 'Unauthorized' });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

function authUser(req, res, next) {
  try {
    const token = req.query._token || req.body._token;

    if (token) {

      // BUG #1
      // let payload = jwt.decode(token);

      let payload = jwt.verify(token, SECRET_KEY);

      req.curr_username = payload.username;
      req.curr_admin = payload.admin;

    }
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }


}

/** Authorization Middleware: ensures user is current user/looked up user and/or Admin. */
// BUG #2
function ensureUserandAdmin(req, res, next) {
  try {
    if (req.curr_admin !== true) {

      if (req.curr_username !== req.params.username) throw new ExpressError('Only  that user or admin can edit a user.', 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}// end

module.exports = {
  requireLogin,
  requireAdmin,
  authUser,
  ensureUserandAdmin
};

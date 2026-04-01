// src/utils/wrapAsync.js

// Takes a function, returns a new function
// The new function automatically catches errors
// and passes them to next()
const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    //                        ↑
    //              same as .catch(err => next(err))
  };
};

export default wrapAsync;
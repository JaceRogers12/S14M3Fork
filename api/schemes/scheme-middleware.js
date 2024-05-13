const db = require("../../data/db-config.js");
/*
  If `scheme_id` does not exist in the database:
  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  //console.log("Checking scheme id");
  let id = req.params.scheme_id;
  let valid = await db("schemes")
    .where("scheme_id", id);
  if (!valid.length) {
    next({status: 404, message: `scheme with scheme_id ${id} not found`});
  } else {
    next();
  }
  
}

/*
  If `scheme_name` is missing, empty string or not a string:
  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  //console.log("Validating scheme");
  let {scheme_name} = req.body;
  if (!scheme_name || typeof scheme_name != "string") {
    next({status: 400, message: "invalid scheme_name"});
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:
  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  //console.log("Validating step");
  let {instructions, step_number} = req.body;
  if (!instructions || typeof instructions != "string" || typeof step_number != "number" || step_number < 1) {
    next({status: 400, message: "invalid step"});
  } else {
    next();
  }
  
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

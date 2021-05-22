const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Setting the field to an empty string if null or undefined
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Validation's and error messages
  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required.";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required.";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required.";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors, //equivilant to erros: errors
    isValid: isEmpty(errors),
  };
};

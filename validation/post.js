const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Setting the field to an empty string if null or undefined
  data.text = !isEmpty(data.text) ? data.text : "";

  // Validation's and error messages
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required.";
  }

  return {
    errors, //equivilant to erros: errors
    isValid: isEmpty(errors),
  };
};

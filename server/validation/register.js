const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name.trim()) ? data.name.trim(): '';
  data.email = !isEmpty(data.email.trim()) ? data.email.trim() : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : ""; 
  data.socialId = !isEmpty(data.socialId) ? data.socialId : ""; 

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.social_id) {
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.confirm_password)) {
      errors.confirm_password = "Confirm Password field is required";
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
      errors.confirm_password = "Passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

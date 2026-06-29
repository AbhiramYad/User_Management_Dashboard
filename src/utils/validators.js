/**
 * Validates user form inputs on the client-side.
 * @param {object} formData - Object containing user input fields
 * @returns {object} errors - Map of field names to error messages
 */
export const validateUser = (formData) => {
  const errors = {};

  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = "First Name is required";
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = "First Name must be at least 2 characters";
  }

  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = "Last Name is required";
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = "Last Name must be at least 2 characters";
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  } else {
    // Standard RFC 5322 email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. user@domain.com)";
    }
  }

  if (!formData.department || !formData.department.trim()) {
    errors.department = "Department is required";
  }

  return errors;
};

import { DEPARTMENTS } from './constants';

/**
 * Splits a full name into first and last name components.
 * Splits by the first space.
 * @param {string} name - Full name
 * @returns {object} Object with firstName and lastName
 */
export const splitName = (name = "") => {
  const cleanName = name.trim();
  if (!cleanName) return { firstName: "", lastName: "" };
  
  const spaceIndex = cleanName.indexOf(" ");
  if (spaceIndex === -1) {
    return { firstName: cleanName, lastName: "" };
  }
  
  const firstName = cleanName.substring(0, spaceIndex);
  const lastName = cleanName.substring(spaceIndex + 1);
  return { firstName, lastName };
};

/**
 * Maps standard JSONPlaceholder user objects to the dashboard schema.
 * Extracts first/last names and assigns a deterministic department.
 * @param {object} user - API user object
 * @param {number} index - Index in the user list for department mapping
 * @returns {object} Mapped user object
 */
export const mapUserData = (user, index = 0) => {
  const { firstName, lastName } = splitName(user.name || "");
  return {
    id: user.id,
    firstName,
    lastName,
    email: user.email || "",
    // Assign a department round-robin from our constant list
    department: user.department || DEPARTMENTS[index % DEPARTMENTS.length],
    companyName: user.company?.name || ""
  };
};

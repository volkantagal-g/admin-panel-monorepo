/**
 * MongoDB ObjectId validation
 * @param {string} id - The id to validate
 * @returns {boolean} - Whether the id is a valid MongoDB ObjectId
 */
export const isValidObjectId = id => {
  if (!id) return false;
  // MongoDB ObjectId: 24 karakterli hexadecimal string
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

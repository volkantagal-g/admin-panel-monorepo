export const generateComponentId = (path = []) => {
  return path?.join('-');
};

export const camelCaseToUpperCase = (str: string) => {
  if (!str) return '';
  return str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
};

export const hasPermission = ({
  createdBy,
  userId,
  permittedRoles,
  userRoles,
}: {
  createdBy: string,
  userId: string,
  permittedRoles: [],
  userRoles: string[],
}) => {
  if (createdBy === userId) {
    return true;
  }
  if (permittedRoles && userRoles) {
    const hasPermittedRole = permittedRoles.find((permittedRole: PermittedRole) => {
      if (typeof permittedRole === 'string') {
        return userRoles.includes(permittedRole);
      }
      return userRoles.includes(permittedRole._id);
    });
    if (hasPermittedRole) {
      return true;
    }
  }
  return false;
};

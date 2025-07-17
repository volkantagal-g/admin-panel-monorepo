import { FRANCHISE_DYNAMIC_CONFIG_PERMS } from './constants';

export const checkPermission = (permissions, canAccess) => {
  if (permissions.length > 0) {
    return permissions.some(permission => canAccess(FRANCHISE_DYNAMIC_CONFIG_PERMS[permission]));
  }
  return true;
};

export const formatPayload = values => {
  let formattedPayload = values;
  Object.keys(formattedPayload).forEach(key => {
    if (formattedPayload[key] === '' || formattedPayload[key] === null) {
      delete formattedPayload[key];
    }
    formattedPayload = { ...formattedPayload, [key]: typeof formattedPayload[key] === 'string' ? formattedPayload[key].trim() : formattedPayload[key] };
  });
  return formattedPayload;
};

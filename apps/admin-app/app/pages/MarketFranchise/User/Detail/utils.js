import { USER_PERMISSION_GROUP_OPTIONS } from '@shared/shared/constantValues';
import { convertSelectOptions } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

export const convertedUserPermissionGroupOptions = convertSelectOptions(USER_PERMISSION_GROUP_OPTIONS, {
  labelKey: 'label',
  valueKey: 'value',
  isTranslation: true,
});

export const arrangeWarehousesString = warehouses => warehouses.map(warehouse => warehouse.name).join(', ');

export const getPermissionDescription = (role, permission) => {
  const permissionItem = role.permissions.find(permItem => permItem.key === permission);
  return permissionItem?.description[getLangKey()];
};

export const prepareRolesForUpdateAPICall = valuesRoles => {
  const newRoles = [];
  valuesRoles.forEach(roleItem => {
    const role = {};
    role.role = roleItem.role._id;
    role.permissions = roleItem.permissions;
    newRoles.push(role);
  });

  return newRoles;
};

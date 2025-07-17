export const getTableData = (permissions, roleList, editablePermission) => {
  const roleObj = roleList.reduce((newRoleObj, currentRole) => ({ ...newRoleObj, [currentRole._id]: currentRole }), {});
  return permissions?.map(permission => {
    const roleDetail = roleObj[permission.role];
    let permissions = [];
    if (roleDetail) {
      const permissionListByRole = roleDetail.permissions;
      const permissionObjByRole = permissionListByRole.reduce(
        (newPermObj, currentPerm) => ({ ...newPermObj, [currentPerm.key]: currentPerm }),
        {},
      );
      permissions = permission.permissions.map(perm => permissionObjByRole[perm]).filter(perm => perm);
    }
    let editMode = false;
    if (editablePermission && editablePermission.role === permission.role) {
      editMode = true;
    }
    return { ...permission, roleDetail, permissions, editMode };
  });
};

export const getPermissionOptions = (roleList, selectedRole) => {
  const roleObj = roleList.reduce((newRoleObj, currentRole) => ({ ...newRoleObj, [currentRole._id]: currentRole }), {});
  const permissionOptions = roleObj[selectedRole]?.permissions || [];
  return permissionOptions;
};

export const getFilteredRoleList = (permissions, roleList) => {
  return roleList.filter(role => permissions?.findIndex(perm => perm.role === role._id) === -1);
};

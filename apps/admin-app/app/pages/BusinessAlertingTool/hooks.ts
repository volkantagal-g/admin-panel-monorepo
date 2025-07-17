import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getUserRolesSelector } from '@shared/redux/selectors/common';
import { getUser } from '@shared/redux/selectors/auth';
import { hasPermission } from '@app/pages/BusinessAlertingTool/utils';

type useUserEditPermissionProps = {
  createdBy?: string,
  permittedRoles?: string[],
}

type UserRoleProps = {
  _id: string;
}

const useUserEditPermission = ({ createdBy = '', permittedRoles = [] }: useUserEditPermissionProps) => {
  const dispatch = useDispatch();
  const userRoles = useSelector(getUserRolesSelector.getData);
  const isUserRolesPending = useSelector(getUserRolesSelector.getIsPending);
  const user = getUser();
  const [canUserEdit, setCanUserEdit] = useState<boolean>(false);

  useEffect(() => {
    if (userRoles.length || !user._id || isUserRolesPending) return;

    dispatch(CommonCreators.getUserRolesRequest({ userId: user._id }));
  }, [dispatch, user._id, userRoles, isUserRolesPending]);

  useEffect(() => {
    if (!userRoles.length) return;

    const checkCanUserEdit = hasPermission({
      createdBy,
      userId: user._id,
      permittedRoles,
      userRoles: userRoles.map((userRole: UserRoleProps) => userRole._id),
    });
    setCanUserEdit(checkCanUserEdit);
  }, [createdBy, permittedRoles, user, userRoles]);

  return { canUserEdit, isPending: isUserRolesPending };
};

export default useUserEditPermission;

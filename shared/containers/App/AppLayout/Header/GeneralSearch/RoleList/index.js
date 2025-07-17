import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';

import { Creators as CoreCreators } from '@shared/redux/actions/core';
import { searchRolesSelector } from '@shared/redux/selectors/core';
import { getUser } from '@shared/redux/selectors/auth';
import { usePermission } from '@shared/hooks';

import { getFormattedRole } from './utils';
import useStyles from './styles';

export default function RoleList({ validatedSearchText, isActive }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();
  const { t } = useTranslation();

  const lastFetchedSearchText = useRef(null);

  const fetchedRoles = useSelector(searchRolesSelector.getData);
  const fetchedRolesPending = useSelector(searchRolesSelector.getIsPending);

  useEffect(() => {
    if (!validatedSearchText || !isActive) return;
    if (lastFetchedSearchText.current === validatedSearchText) return;
    lastFetchedSearchText.current = validatedSearchText;
    dispatch(CoreCreators.searchRolesRequest({ searchText: validatedSearchText }));
  }, [dispatch, validatedSearchText, isActive]);

  const roles = useMemo(
    () => (validatedSearchText ? fetchedRoles : []),
    [validatedSearchText, fetchedRoles],
  );

  const currUserRoles = useMemo(() => {
    const userRoleSet = new Set(getUser().roles);
    return roles.filter(r => userRoleSet.has(r._id)).sort((a, b) => a.name.localeCompare(b.name));
  }, [roles]);

  const sortedAllRoles = useMemo(
    () => roles.sort((a, b) => a.name.localeCompare(b.name)),
    [roles],
  );

  return (
    <div className={classes.rolesContainer}>
      <b className={classes.roleListTitle}> {t('YOUR_ROLES')} </b>
      <Skeleton loading={fetchedRolesPending} active>
        <div className={classes.roleList}>
          { currUserRoles.map(r => getFormattedRole(r, canAccess)) }
        </div>
      </Skeleton>
      <div className={classes.divider} />
      <b className={classes.roleListTitle}> {t('ROLES')} </b>
      <Skeleton loading={fetchedRolesPending} active>
        <div className={classes.roleList}>
          {sortedAllRoles.map(r => getFormattedRole(r, canAccess)) }
        </div>
      </Skeleton>
    </div>
  );
}

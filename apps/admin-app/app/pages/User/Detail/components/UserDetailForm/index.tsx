import { Switch } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { usePermission } from '@shared/hooks';
import AntCard from '@shared/components/UI/AntCard';
import permKey from '@shared/shared/permKey.json';
import { getUserRolesSelector } from '@shared/redux/selectors/common';
import AnalyticsService from '@shared/services/analytics';

import UserForm from '../../../components/UserForm';
import { USER_FORM_MODE } from '../../../constants';
import { Creators } from '../../redux/actions';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { activateUserSelector, getUserByIdSelector, inActivateUserSelector, updateUserSelector } from '../../redux/selectors';

const UserDetailForm = () => {
  const { t } = useTranslation('userPage');
  const dispatch = useDispatch();

  const [formMode, setFormMode] = useState(USER_FORM_MODE.DETAIL);

  const user = useSelector(getUserByIdSelector.getData);
  const userPending = useSelector(getUserByIdSelector.getIsPending);
  const userNotFound = useMemo(() => isEmpty(user), [user]);
  const detailUserRoles = useSelector(getUserRolesSelector.getData);

  const isUpdateLoading = useSelector(updateUserSelector.getIsPending);

  const isActivateUserPending = useSelector(activateUserSelector.getIsPending);
  const isInactivateUserPending = useSelector(inActivateUserSelector.getIsPending);

  const { canAccess, Can } = usePermission();
  const canAccessEdit = canAccess(permKey.PAGE_USER_DETAIL_EDIT_USER);

  const toggleIsActive = (value: boolean) => {
    if (value) {
      dispatch(Creators.activateUserRequest({ id: user._id }));
    }
    else {
      const rolesAlreadyFetched = !isEmpty(detailUserRoles);
      dispatch(Creators.inActivateUserRequest({ id: user._id, refetchRoles: rolesAlreadyFetched }));
    }
  };

  const title = (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div>{t('USER_INFO')}</div>
      <Can permKey={permKey.PAGE_USER_DETAIL_EDIT_USER}>
        <Switch
          checked={user?.isActive}
          onChange={toggleIsActive}
          checkedChildren={t('global:ACTIVE')}
          unCheckedChildren={t('global:INACTIVE')}
          className={user?.isActive ? 'bg-success' : 'bg-danger'}
          disabled={userNotFound || userPending || isActivateUserPending || isInactivateUserPending}
        />
      </Can>
    </div>

  );

  const setFormModeWithEvent = (mode: string) => {
    setFormMode(mode);
    if (mode === USER_FORM_MODE.EDIT) {
      AnalyticsService.track(PANEL_EVENTS.USER_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.USER_DETAIL.BUTTON.USER_INFO_EDIT });
    }
  };

  return (
    <AntCard title={title}>
      <UserForm
        initialValues={user}
        disabled={userNotFound || userPending}
        mode={formMode}
        setMode={setFormModeWithEvent}
        isActionLoading={isUpdateLoading}
        canAccessActions={canAccessEdit}
        onSuccess={values => {
          dispatch(Creators.updateUserRequest({
            id: user._id,
            updateData: values,
            afterSuccess: () => {
              setFormMode(USER_FORM_MODE.DETAIL);
            },
          }));
        }}
      />
    </AntCard>
  );
};

export default UserDetailForm;

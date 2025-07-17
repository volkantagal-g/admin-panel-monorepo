import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Space, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import {
  getRoleByIdSelector,
  updateRoleSelector,
  deleteRoleSelector,
} from '../../redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { UserRoleRequestModal } from './UserRoleRequestModal';
import { ROLE_FORM_MODE } from '../../../constants';
import RoleForm from '../../../components/RoleForm';
import { ROUTE } from '@app/routes';

const RoleDetailForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const role = useSelector(getRoleByIdSelector.getData);
  const rolePending = useSelector(getRoleByIdSelector.getIsPending);
  const roleNotFound = !role?._id;

  const isRoleUpdatePending = useSelector(updateRoleSelector.getIsPending);
  const isRoleDeletePending = useSelector(deleteRoleSelector.getIsPending);
  const { t } = useTranslation('rolePage');
  const hasPermissionToEditRoleInfo = canAccess(permKey.PAGE_ROLE_DETAIL_EDIT_ROLE_INFO);

  const [formMode, setFormMode] = useState<string>(ROLE_FORM_MODE.DETAIL);

  useEffect(() => {
    dispatch(Creators.getUserRoleRequestsRequest());
  }, [dispatch]);

  const handleRoleDelete = () => {
    dispatch(Creators.deleteRoleRequest({ id: role?._id }));
  };

  const setFormModeCustom = (input: string) => {
    if (formMode === ROLE_FORM_MODE.DETAIL) {
      AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.ROLE_INFO_EDIT });
    }
    setFormMode(input);
  };

  const title = (
    <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
      <div className="mr-auto">{t('ROLE_INFO')}</div>
    </div>
  );

  const cardExtras = (
    <Space>
      <Switch
        loading={rolePending || isRoleUpdatePending}
        checkedChildren={(
          <Space>
            <CheckOutlined />
            <span>{t('ACTIVE')}</span>
          </Space>
        )}
        unCheckedChildren={(
          <Space>
            <CloseOutlined />
            <span>{t('INACTIVE')}</span>
          </Space>
        )}
        checked={role.isActive}
        onChange={checked => {
          dispatch(Creators.updateRoleRequest({
            id: role._id,
            updateData: { isActive: checked },
            deleteParent: false,
          }));
        }}
      />
      {role.parent && (
        <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', role.parent._id)} className="mr-2">
          <Button size="small">
            {t('VIEW_PARENT_ROLE')}
          </Button>
        </Link>
      )}
      {!roleNotFound && !rolePending && <UserRoleRequestModal role={role} />}
    </Space>
  );

  return (
    <AntCard title={title} extra={cardExtras}>
      <RoleForm
        key={role?.updatedAt}
        initialValues={{ ...role, parent: role.parent?._id }}
        initialParentRole={role.parent && { value: role.parent._id, label: role.parent.name }}
        disabled={roleNotFound || rolePending}
        mode={formMode}
        setMode={setFormModeCustom}
        isActionLoading={isRoleUpdatePending}
        canAccessActions={hasPermissionToEditRoleInfo}
        onDelete={handleRoleDelete}
        isDeleteLoading={isRoleDeletePending}
        onSuccess={values => {
          dispatch(Creators.updateRoleRequest({
            id: role._id,
            updateData: values,
            deleteParent: role.parent && !values.parent,
            afterSuccess: () => {
              setFormMode(ROLE_FORM_MODE.DETAIL);
            },
          }));
        }}
      />
    </AntCard>
  );
};

export default RoleDetailForm;

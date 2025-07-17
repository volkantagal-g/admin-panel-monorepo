import { memo, useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { find } from 'lodash';

import { ROLE_REQUEST_STATUSES } from '@app/pages/Role/Detail/components/utils';
import { userRoleRequestsSelector } from '../../../redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import UserRoleRequestModalContent from '../../../../components/UserRoleRequestModalContent';
import { Creators } from '../../../redux/actions';

export const UserRoleRequestModal = ({ role }: { role: RoleType }) => {
  const { t } = useTranslation('rolePage');
  const dispatch = useDispatch();
  const userRoleRequestData = useSelector(userRoleRequestsSelector.getData);
  const userRoleRequestDataPending = useSelector(userRoleRequestsSelector.getIsPending);
  const user = getUser();

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (userRoleRequestDataPending) return null;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleRequestUserRoleRequest = ({
    roleId,
    requestReason,
    timeLimit,
    durationType,
    durationDays,
    endDate,
  }: { roleId: MongoIDType } & Partial<Omit<RoleRequestType, '_id'>>) => {
    if (roleId && requestReason) {
      dispatch(Creators.requestUserRoleRequest({
        roleId,
        requestReason,
        timeLimit,
        durationType,
        durationDays,
        endDate,
      }));
      setIsModalVisible(false);
    }
  };

  const getFooterActions = () => {
    return [
      <Button key="userRoleSendRequest" type="primary" form="user-role-request" htmlType="submit">{t('SEND_REQUEST')}</Button>,
    ];
  };

  const userId = user?._id;
  const userRoleSet = new Set(user?.roles || []);

  const requestedRoles = new Set(userRoleRequestData.filter(r => r.status === ROLE_REQUEST_STATUSES.PENDING).map(r => (r.role as RoleType)._id) || []);

  let roleMembershipStatus;
  let tooltipText = '';

  if (requestedRoles.has(role._id)) {
    roleMembershipStatus = (
      <Button disabled size="small">{t('PENDING')}</Button>
    );
    tooltipText = t('rolePage:YOU_HAVE_ALREADY_REQUESTED_THIS_ROLE');
  }
  else if (!userRoleSet.has(role._id)) {
    tooltipText = t('rolePage:YOU_ARE_NOT_A_MEMBER_OF_THIS_ROLE');
    roleMembershipStatus = (
      <Button type="primary" onClick={showModal}>
        {t('JOIN')}
      </Button>
    );
  }
  else {
    const isTheUserOwnerOfTheRole = find((role?.roleOwners as RoleOwner[]), roleOwner => roleOwner._id === userId);
    const text = isTheUserOwnerOfTheRole ? t('rolePage:ROLE_OWNER') : t('global:STANDARD');
    tooltipText = isTheUserOwnerOfTheRole ? t('rolePage:YOU_ARE_THE_OWNER_OF_THIS_ROLE') : t('rolePage:YOU_ARE_A_MEMBER_OF_THIS_ROLE');
    roleMembershipStatus = <Button disabled size="small">{text}</Button>;
  }

  return (
    <>
      <Tooltip title={tooltipText}>
        {roleMembershipStatus}
      </Tooltip>
      <Modal
        key="UserRoleRequestModal"
        title={role?.name}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        okText={t('SEND_REQUEST')}
        footer={getFooterActions()}
        destroyOnClose
      >
        <UserRoleRequestModalContent onRequestUserRoleRequest={handleRequestUserRoleRequest} role={role} />
      </Modal>
    </>
  );
};

export default memo(UserRoleRequestModal);

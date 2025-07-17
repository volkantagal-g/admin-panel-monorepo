import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';

import UserSelect from '@shared/containers/Select/User';

export default function AddPageOwnerModal({
  onConfirm,
  onCancel,
  loading,
  excludedUsers,
}) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation('pagePage');

  const hideModal = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    hideModal();
    if (onCancel) onCancel();
  };

  return (
    <>
      <Button
        icon={<UserAddOutlined />}
        loading={loading}
        onClick={() => {
          setVisible(true);
        }}
      >
        {t('pagePage:ADD_OWNER')}
      </Button>

      <Modal
        title={t('pagePage:ADD_OWNER')}
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={handleCancel}
      >
        <OwnerSelect onConfirm={onConfirm} onCancel={handleCancel} hideModal={hideModal} excludedUsers={excludedUsers} />
      </Modal>
    </>

  );
}

function OwnerSelect({ onConfirm, onCancel, hideModal, loading, excludedUsers }) {
  const [owners, setOwners] = useState([]);
  const { t } = useTranslation('pagePage');

  return (
    <>
      <UserSelect
        mode="multiple"
        filterOption={(inputValue, option) => {
          // exclude already owner users from select options
          if (excludedUsers?.length) {
            const isExcluded = excludedUsers.some(
              excludedUser => excludedUser === option.value,
            );
            if (isExcluded) return false;
          }
          return true;
        }}
        onChange={_owners => {
          setOwners(_owners);
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 10,
          gap: 10,
        }}
      >
        <Button
          loading={loading}
          onClick={() => {
            if (onCancel) onCancel();
          }}
        >
          {t('global:CANCEL')}
        </Button>
        <Button
          loading={loading}
          type="primary"
          disabled={!owners.length}
          onClick={() => {
            if (onConfirm) onConfirm({ ownerIds: owners, afterSuccess: hideModal });
          }}
        >
          {t('global:ADD')}
        </Button>
      </div>
    </>
  );
}

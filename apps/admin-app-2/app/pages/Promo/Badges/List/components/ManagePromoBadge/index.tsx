import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { PromoBadge } from '../../interfaces';
import ManageModalForm from './ManageModalForm';

type ManagePromoBadgeProps = {
  promoBadge: PromoBadge | null;
  onManageModalClick: () => void;
  isModalVisible: boolean;
}

const ManagePromoBadge: FC<ManagePromoBadgeProps> = ({ promoBadge, onManageModalClick, isModalVisible }) => {
  const { t } = useTranslation('promoBadgesPage');

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onManageModalClick}
      >
        {t('CREATE.TITLE')}
      </Button>
      <ManageModalForm
        promoBadge={promoBadge}
        isModalVisible={isModalVisible}
        onClose={onManageModalClick}
      />
    </>
  );
};

export default ManagePromoBadge;

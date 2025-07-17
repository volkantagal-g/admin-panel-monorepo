import { Button, Modal, Tag } from 'antd';
import { get } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Spinner from '@shared/components/Spinner';
import { getLangKey } from '@shared/i18n';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import { financeOrderStatuses } from '@shared/shared/constantValues';
import useStyles from './styles';

const Tags = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');

  const orderDetail = useSelector(financeOrderDetailSelector.getData) || {};
  const isPending = useSelector(financeOrderDetailSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const orderDetailStatus = get(orderDetail, 'status', '');

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className={classes.tag}>
      <Tag className={classes.productStatus}>
        {financeOrderStatuses[orderDetailStatus] && financeOrderStatuses[orderDetailStatus][getLangKey()]}
      </Tag>
      <Button className={classes.jsonButton} type="primary" size="small" onClick={showModal}>
        {t('ORDER_DETAIL_JSON')}
      </Button>
      <Modal
        title={t('ORDER_DETAIL_SUPPORT')}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <pre>{JSON.stringify(orderDetail, null, 4)}</pre>
      </Modal>
    </div>
  );
};

export { Tags };

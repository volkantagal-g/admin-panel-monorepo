import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, JsonModal } from '@shared/components/GUI';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { orderDetailSelector } from '../../redux/selectors';

const OrderJSON = () => {
  const { Can } = usePermission();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { t } = useTranslation('marketOrderPage');

  return (
    <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_JSON_MODAL}>
      <Button
        color="secondary"
        size="extra-small"
        onClick={() => setIsModalVisible(true)}
      >
        {t('global:SHOW_AS_JSON')}
      </Button>
      <JsonModal
        title={t('ORDER_DETAIL_SUPPORT')}
        data={orderDetail}
        visible={isModalVisible}
        handleCancel={() => setIsModalVisible(false)}
        allowCopyToClipboard
      />
    </Can>
  );
};
export default OrderJSON;

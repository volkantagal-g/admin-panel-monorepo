import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/Card';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/styles';
import { DELIVERY_TYPES } from '../../actionsMenu/modals/RefundModal/constants';

const { Text } = Typography;

const DELIVERY_TYPES_TRANSLATION_PREFIXES = {
  [DELIVERY_TYPES.COURIER_RETRIEVES]: 'REFUND_TIMELINE.DELIVERY_TYPE_COURIER',
  [DELIVERY_TYPES.CUSTOMER_DELIVERS]: 'REFUND_TIMELINE.DELIVERY_TYPE_CUSTOMER',
  [DELIVERY_TYPES.INSTANT_MONEY_REFUND]: 'REFUND_TIMELINE.DELIVERY_TYPE_INSTANT',
};

const RefundInfo = ({ refundedBy, deliveryType }) => {
  const styles = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  return (
    <Card classNames={styles.refundInfo}>
      <div className={styles.refundInfoItem}>
        <Text strong>
          {t('REFUND_MODAL.REFUND_TYPE')}:
        </Text>

        <Text>
          {t(DELIVERY_TYPES_TRANSLATION_PREFIXES[deliveryType])}
        </Text>
      </div>

      <div className={styles.refundInfoItem}>
        <Text strong>
          {t('REFUNDED_BY')}:
        </Text>

        <Text>
          {refundedBy}
        </Text>
      </div>
    </Card>
  );
};

export default RefundInfo;

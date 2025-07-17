import { useTranslation } from 'react-i18next';

import Text from 'antd/lib/typography/Text';

import Card from '@shared/components/Card';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/Address/styles';

const Address = ({ location }) => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  return (
    <Card>
      <Text className={classes.cardTitle} strong>
        {t('REFUND_TIMELINE.ADDRESS')}
      </Text>
      <div className={classes.address}>
        <Text strong type="secondary">
          {t('REFUND_TIMELINE.ORDER_ADDRESS')}
        </Text>
        <Text strong>{location}</Text>
      </div>
    </Card>
  );
};

export default Address;

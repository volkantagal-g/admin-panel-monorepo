import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/orderProgressBar/styles';
import { initProgressBar } from '@app/pages/ArtisanOrder/Detail/components/orderProgressBar/utils';
import ProgressBar from '@shared/components/ProgressBar';

const OrderProgressBar = ({ order }) => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  const { progressBarItems, totalTime } = initProgressBar(order);

  if (!order.checkoutDate) {
    return null;
  }

  return (
    <div className={classes.orderProgressBarWrapper}>
      <h4 className={classes.title}>
        {t('PROGRESSBAR.TOTAL_TIME')}: <strong>{totalTime}</strong>
      </h4>
      <ProgressBar progressBarItems={progressBarItems} />
    </div>
  );
};

OrderProgressBar.propTypes = {
  order: PropTypes.shape({
    courierVerifyDate: PropTypes.string,
    reachDate: PropTypes.string,
    deliverDate: PropTypes.string,
    checkoutDate: PropTypes.string,
    verifyDate: PropTypes.string,
    prepareDate: PropTypes.string,
    cancelDate: PropTypes.string,
    deliveryType: PropTypes.number,
  }).isRequired,
};

export default OrderProgressBar;

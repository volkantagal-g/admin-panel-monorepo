// CANCEL time does not exist in response

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import moment from 'moment';

import { initProgressBar } from '@app/pages/FinanceOrder/detail/components/DetailProgressBar/utils';

import useStyles from './styles';

import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';

import ProgressBar from '@shared/components/ProgressBar';

const DetailProgressBar = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');

  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const checkoutDate = moment.utc(orderDetail?.checkoutDate).format();
  const pickingDate = orderDetail?.picking?.pickingDate;
  const reachDate = orderDetail?.reach?.reachDate;
  const deliverDate = orderDetail?.delivery?.deliverDate;
  const verifyDate = orderDetail?.verify?.verifyDateTime;
  const prepareDate = orderDetail?.prepare?.preparationDate;
  const cancelDate = orderDetail?.cancelDate;

  const { progressBarItems, totalTime } = initProgressBar({
    checkoutDate,
    verifyDate,
    prepareDate,
    pickingDate,
    reachDate,
    deliverDate,
    cancelDate,
  });

  return (
    <div className={classes.orderProgressBarWrapper}>
      <h4 className={classes.title}>
        {t('PROGRESSBAR.TOTAL_TIME')}:<strong>{totalTime}</strong>
      </h4>
      <ProgressBar progressBarItems={progressBarItems} />
    </div>
  );
};

export { DetailProgressBar };

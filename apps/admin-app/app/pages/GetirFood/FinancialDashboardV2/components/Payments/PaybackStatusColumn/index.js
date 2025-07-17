import { getLangKey } from '@shared/i18n';

import useStyles from './styles';

export const PaymentStatusColumn = ({ paymentStatus }) => {
  const label = paymentStatus.name[getLangKey()];
  const classes = useStyles({ paymentStatus: paymentStatus.status });

  return (
    <div className={classes.badgeContainer}>
      <span className={classes.label}>{label}</span>
    </div>
  );
};

export const getPaymentStatusColumn = paymentStatus => (paymentStatus ? <PaymentStatusColumn paymentStatus={paymentStatus} /> : '-');

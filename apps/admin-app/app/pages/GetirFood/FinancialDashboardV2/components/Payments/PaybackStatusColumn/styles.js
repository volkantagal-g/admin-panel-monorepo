import { createUseStyles } from 'react-jss';

import { PAYMENT_STATUS_BG_COLORS, PAYMENT_STATUS_COLORS } from './utils';

export default createUseStyles({
  badgeContainer: ({ paymentStatus }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    backgroundColor: PAYMENT_STATUS_BG_COLORS[paymentStatus],
    borderRadius: 6,
    maxWidth: 'fit-content',
  }),
  label: ({ paymentStatus }) => ({
    color: PAYMENT_STATUS_COLORS[paymentStatus],
    fontSize: 12,
    fontWeight: 600,
  }),
});

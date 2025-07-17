import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import useStyles from '../styles';
import { getLangKey } from '@shared/i18n';
import { cardBanks, posBanks } from '@shared/shared/constantValues';
import { ROUTE } from '@app/routes';
import { Card } from '@shared/components/GUI';

const CreditCardInfo = ({ payment = {} }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');

  const { transactionId, parameters } = payment;
  const posBank = posBanks?.[get(parameters, 'posBank', '')];
  const cardNo = get(parameters, 'cardNo', '');
  const cardBank = cardBanks?.[get(parameters, 'cardBank', '')];

  const paymentDetailsPath = ROUTE.PAYMENT_TRANSACTION_DETAIL.path.replace(
    ':id',
    transactionId,
  );

  const cardInfo = [
    {
      label: t('CARD.CARD_NO'),
      value: cardNo,
    },
    {
      label: t('CARD.CARD_BANK'),
      value: cardBank?.[getLangKey()],
    },
    {
      label: t('CARD.POS_BANK'),
      value: posBank?.[getLangKey()],
    },
    {
      label: t('CARD.TRANSACTION_ID'),
      value: transactionId,
      link: paymentDetailsPath,
    },
  ];
  return (
    <Card title={t('CARD.INFO')} size="small">
      <div className={classes.infoCard}>
        {cardInfo?.map(({ label, value, link }) => (
          <div key={label} className={classes.infoCardLabel}>
            <span className={classes.col1}>
              <strong>{label}</strong>
            </span>
            <span className={classes.col2}>
              {link ? (
                <Link to={link}>{value}</Link>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default memo(CreditCardInfo);

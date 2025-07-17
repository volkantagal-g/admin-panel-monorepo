import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { orderDetailSelector } from '../../redux/selectors';
import { tableColumns } from './config';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/subscriptionInfoTable/styles';
import Card from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { currencyFormat } from '@shared/utils/localization';

const SubscriptionInfoTable = ({ subscriptionInfo }) => {
  const { t } = useTranslation('artisanOrderPage');
  const classes = useStyles();
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const { details, subscriptionId, subsBenefitAmount = 0 } = subscriptionInfo ?? {};
  const { deliveryFeeDiscount, promotions } = details?.subscriptionBenefits ?? {};

  const tableData = [
    ...(deliveryFeeDiscount ? [{
      benefit: t('DELIVERY_FEE'),
      amount: deliveryFeeDiscount,
    }] : []),
    ...(promotions?.map(promo => ({
      benefit: t('GETIR_SUBS_PROMO'),
      amount: promo.amount,
    })) ?? []),
  ];

  return (
    <Card>
      <AntTableV2
        title={(
          <>
            {t('GETIR_SUBS')}{subscriptionId && <> - ID &nbsp; <strong>{subscriptionId}</strong></>}
          </>
        )}
        data={tableData}
        columns={tableColumns}
        loading={isPending}
      />
      {subsBenefitAmount > 0 && (
        <Row justify="end" className={classes.totalUsageAmountWrapper}>
          <Col>
            <strong>{t('TOTAL_USAGE_AMOUNT')}</strong>
          </Col>
          <Col>
            {currencyFormat().format(subsBenefitAmount / 100)}
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default SubscriptionInfoTable;

import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { transactionDetailSelector } from '../../redux/selectors';
import Spinner from '@shared/components/Spinner';
import { PaymentOverview } from './components/PaymentOverview';
import Merchant from './components/Merchant';
import {
  amountCurrencyFormat,
  calculatePrecisedAmount,
  getRequestedAmount,
} from '@app/pages/Payment/utils';
import { usePermission } from '@shared/hooks';
import PaymentEvents from './components/PaymentEvents';
import ShopperDetails from './components/ShopperDetails';
import GeneralDetails from './components/GeneralDetails';
import { DEFAULT_AMOUNT } from '@app/pages/Payment/constants';
import DeviceDetails from './components/DeviceDetails';

const Detail = () => {
  const { id } = useParams();
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();

  const transactionDetailSelectorData = useSelector(
    transactionDetailSelector.getData,
  );

  const transactionDetailSelectorIsPending = useSelector(
    transactionDetailSelector.getIsPending,
  );
  const transactionId = useSelector(transactionDetailSelector.getTransactionId);

  const financialSummary = transactionDetailSelectorData?.financialSummary;

  const currency = get(financialSummary, 'currency', '');
  const precisedAuthorizedAmount = calculatePrecisedAmount(
    get(financialSummary, 'totalAmount', DEFAULT_AMOUNT),
  );
  const precisedTotalBalance = calculatePrecisedAmount(
    get(financialSummary, 'totalBalance', DEFAULT_AMOUNT),
  );

  const paymentEvents = get(transactionDetailSelectorData, 'events', []);
  const lastPaymentEvents = paymentEvents[paymentEvents.length - 1];
  const paymentProvider = get(lastPaymentEvents, 'payment.provider', '');
  const paymentMethod = get(lastPaymentEvents, 'payment.method', '');

  const mixed = transactionDetailSelectorData?.mixed;
  const status = financialSummary?.status;
  const financialSummaryWithAmount = {
    status,
    totalAmount: amountCurrencyFormat(precisedAuthorizedAmount, currency),
    totalBalance: amountCurrencyFormat(precisedTotalBalance, currency),
    requestedAmount: getRequestedAmount(financialSummary),
    transactionId,
    paymentProvider,
    paymentMethod,
    mixed,
  };
  const merchant = transactionDetailSelectorData?.merchant;
  const merchantKey = transactionDetailSelectorData?.merchant.key;

  const shopper = transactionDetailSelectorData?.shopper;
  const generalDetails = {
    createdAt: transactionDetailSelectorData?.createdAt,
    location: transactionDetailSelectorData?.location,
    merchantReference: transactionDetailSelectorData?.merchantReference,
    merchantOrderId: transactionDetailSelectorData?.merchantOrderId,
    mode: transactionDetailSelectorData?.mode,
    updatedAt: transactionDetailSelectorData?.updatedAt,
  };

  useEffect(() => {
    dispatch(Creators.getTransactionDetailRequest({ id }));
  }, [dispatch, id]);

  return transactionDetailSelectorIsPending ? (
    <Spinner />
  ) : (
    <Row gutter={12}>
      <Col span={24} className="mb-4">
        <PaymentOverview t={t} financialSummary={financialSummaryWithAmount} />
      </Col>
      <Col md={24} className="mb-4">
        <PaymentEvents
          canAccess={canAccess}
          t={t}
          paymentEvents={paymentEvents}
        />
      </Col>

      <Col span={12}>
        <section data-testid="general-details-section" className="mb-4">
          <GeneralDetails
            generalDetails={{ ...generalDetails, merchantKey }}
            t={t}
          />
        </section>
      </Col>

      <Col span={12}>
        <section data-testid="merchant-details-section" className="mb-4">
          <Merchant merchant={merchant} />
        </section>
      </Col>

      <Col span={12}>
        <section data-testid="shopper-details-section" className="mb-4">
          <ShopperDetails t={t} shopper={shopper} />
        </section>
      </Col>

      <Col span={12}>
        <section data-testid="device-details-section" className="mb-4">
          <DeviceDetails device={shopper?.device} t={t} />
        </section>
      </Col>

    </Row>
  );
};

export default Detail;

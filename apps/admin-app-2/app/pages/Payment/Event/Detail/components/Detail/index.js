import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';
import Spinner from '@shared/components/Spinner';
import { eventDetailSelector } from '../../redux/selectors';
import { PaymentOverview } from '@app/pages/Payment/Transactions/Detail/components/Detail/components/PaymentOverview';
import Merchant from '@app/pages/Payment/Transactions/Detail/components/Detail/components/Merchant';
import EventDetail from './components/EventDetail';
import Payment from './components/Payment';
import StatusHistory from './components/StatusHistory';
import TransactionDetail from './components/TransactionDetail';
import {
  amountCurrencyFormat,
  calculatePrecisedAmount,
  getRequestedAmount,
} from '@app/pages/Payment/utils';
import {
  DEFAULT_AMOUNT,
  THREE_D_ACTIVE_PROVIDERS,
} from '@app/pages/Payment/constants';
import Errors from './components/Errors';
import { topupBankCards } from '@shared/shared/constantValues';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const eventDetailData = useSelector(eventDetailSelector.getData);
  const eventDetailIsPending = useSelector(eventDetailSelector.getIsPending);
  const selectedLanguage = useSelector(getSelectedLanguage);

  useEffect(() => {
    dispatch(Creators.getEventDetailRequest({ id }));
  }, [dispatch, id]);

  const eventDetail = get(eventDetailData, 'events.0', {});
  const payment = get(eventDetail, 'payment', '');
  const merchantOrderId = eventDetailData?.merchantOrderId;
  const paymentProvider = get(payment, 'provider', '');
  const paymentMethod = get(payment, 'method', '');
  const installmentCount = get(payment, 'data.installmentCount', '');
  const statusHistory = get(eventDetail, 'statusHistory', []);
  /*   const paymentLifecycle = eventDetailData?.paymentLifecycle; */
  const merchant = eventDetailData?.merchant;
  const merchantKey = merchant?.key;
  const financialSummary = eventDetailData?.financialSummary;
  const currency = get(financialSummary, 'currency', '');
  const precisedAuthorizedAmount = calculatePrecisedAmount(
    get(financialSummary, 'totalAmount', DEFAULT_AMOUNT),
  );
  const precisedTotalBalance = calculatePrecisedAmount(
    get(financialSummary, 'totalBalance', DEFAULT_AMOUNT),
  );
  const status = financialSummary?.status;
  const mixed = false; // the event can not be mixed !
  const transactionId = eventDetailData?.transactionId;
  let is3DS = null;
  const is3DSActive = THREE_D_ACTIVE_PROVIDERS.indexOf(paymentProvider) > -1;
  const liabilityShift = get(payment, 'data.liabilityShift', '');
  const threeDAuthenticated = get(payment, 'data.threeDAuthenticated', '');
  const threeDOffered = get(payment, 'data.threeDOffered', '');
  const cardBankName = get(payment, 'data.cardData.bankIca', 0);
  const posBankName = get(payment, 'data.processedPosBank', 0);
  const cardBankTxt = get(topupBankCards[cardBankName], selectedLanguage, '');
  const posBankTxt = get(topupBankCards[posBankName], selectedLanguage, '');

  if (THREE_D_ACTIVE_PROVIDERS.indexOf(paymentProvider) > -1) {
    is3DS = get(payment, 'data.is3DS', '');
  }

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
  const transactionDetail = {
    transactionId: eventDetailData?.transactionId,
    mode: eventDetailData?.mode,
    merchantReference: eventDetailData?.merchantReference,
    location: eventDetailData?.location,
    installmentCount,
  };

  const errors = get(eventDetail, 'error', '');

  const adyenData = {
    threeDAuthenticated,
    threeDOffered,
    liabilityShift,
  };

  const eventDetailProp = {
    ...eventDetail,
    merchantOrderId,
    merchantKey,
    is3DS,
    is3DSActive,
    adyenData,
    cardBankTxt,
    posBankTxt,
  };

  return eventDetailIsPending ? (
    <Spinner />
  ) : (
    <Row gutter={12}>
      <Col span={24} className="mb-4">
        <PaymentOverview financialSummary={financialSummaryWithAmount} />
      </Col>
      <Col span={12} className="mb-4" data-testid="event-detail-section">
        <EventDetail eventDetail={eventDetailProp} currency={currency} />
      </Col>
      <Col span={12} className="mb-4">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Payment payment={payment} />
          </Col>
          <Col span={24}>
            <Merchant merchant={merchant} />
          </Col>
        </Row>
      </Col>

      <Col span={24} className="mb-4">
        <StatusHistory statusHistory={statusHistory} currency={currency} />
      </Col>
      <Col span={12} className="mb-4">
        <TransactionDetail transactionDetail={transactionDetail} />
      </Col>
      <Col span={12} className="mb-4">
        <Errors errors={errors} />
      </Col>
    </Row>
  );
};

export default Detail;

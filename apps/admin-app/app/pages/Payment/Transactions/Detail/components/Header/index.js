import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { find, flatten } from 'lodash';

import { transactionDetailSelector } from '../../redux/selectors';
import { calculatePrecisedAmount } from '@app/pages/Payment/utils';
import RefundModal from '../RefundModal';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('global');
  const data = useSelector(
    transactionDetailSelector.getData,
  );
  const merchantId = useSelector(
    transactionDetailSelector.getMerchantId,
  );
  const transactionId = useSelector(
    transactionDetailSelector.getTransactionId,
  );

  const isMixed = data?.mixed;
  // if the transaction is not mixed, get last event's payment method and provider
  const events = isMixed ? data?.events : [data?.events[data.events.length - 1]];
  const financialSummaryStatus = data?.financialSummary?.status;
  const currency = data?.financialSummary?.currency;
  const lastEventStatus = data?.events[data.events.length - 1].status;
  const status = financialSummaryStatus || lastEventStatus;
  let isButtonDisabled = false;
  const processesOfEvents = events.map(event => event?.processes);
  let totalProcessesEventLength = 0;
  for (let index = 0; index < processesOfEvents.length; index++) {
    totalProcessesEventLength += processesOfEvents[index]?.length || 0;
  }
  const flattenedArr = flatten(processesOfEvents);
  const ongoingProcess = find(flattenedArr, ['status', 'PROCESSING' || 'CANCEL' || 'REFUND']);
  if (status !== 'AUTHORIZED') {
    isButtonDisabled = true;
  }
  else {
    isButtonDisabled = !!ongoingProcess;
  }
  const fixedEvents = events?.map(event => {
    return {
      amount: 0,
      balance: calculatePrecisedAmount(event?.balance),
      payment: {
        method: event?.payment.method,
        provider: event?.payment.provider,
      },
      fullRefund: false, // needs for full refund checkbox on table
      key: event?._id,
      eventId: event?._id,
    };
  });
  const modalData = {
    events: fixedEvents,
    merchantId,
    transactionId,
    currency,
  };
  return (
    <Row align="middle">
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.TRANSACTION.DETAIL')} />
      </Col>

      <Can permKey={permKey.PAGE_PAYMENT_TRANSACTION_DETAIL_COMPONENT_REFUND_BUTTON}>
        <Col>
          <RefundModal data={modalData} isButtonDisabled={isButtonDisabled} totalProcessesEventLength={totalProcessesEventLength} />
        </Col>
      </Can>

    </Row>
  );
};

export default Header;

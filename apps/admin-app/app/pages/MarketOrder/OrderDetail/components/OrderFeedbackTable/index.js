import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { orderFeedbackSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { Collapse } from '@shared/components/GUI';

const OrderFeedback = () => {
  const { t } = useTranslation('marketOrderPage');

  const columns = getTableColumns(t);

  const orderFeedbackList = useSelector(orderFeedbackSelector.getData);
  return (
    <Collapse
      expandIconPosition="right"
      title={`${t('TIMELINE.ORDER_FEEDBACKS')} - ${t('global:TOTAL')}: ${
        orderFeedbackList?.length
      }`}
    >
      <AntTableV2 data={orderFeedbackList} columns={columns} loading={false} />
    </Collapse>
  );
};

export default OrderFeedback;

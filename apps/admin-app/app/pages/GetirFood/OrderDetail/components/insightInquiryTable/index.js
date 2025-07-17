import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import InsightDetailModal from '@app/pages/GetirFood/OrderDetail/components/insightDetailModal';
import { getOrderInsightInquirySelector, orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import useStyles from '@app/pages/GetirFood/OrderDetail/styles';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from './config';

const InsightInquiryTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const orderInsightDetail = useSelector(getOrderInsightInquirySelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const orderInsightCount = orderInsightDetail.length;

  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState({});

  const onDetailClick = ({ record }) => {
    setIsModalVisible(true);
    setSelectedInsight(record);
  };

  const tableColumns = useMemo(() => {
    return generateColumns({ onDetailClick, isRefundPending: orderDetail.isRefundPending, isRefunded: orderDetail.isRefunded, classes, t });
  }, [orderDetail.isRefundPending, orderDetail.isRefunded, classes, t]);

  return (
    <>
      <Card>
        <AntTable
          title={`${t('foodOrderPage:ORDER_FEEDBACKS.TITLE')}: ${orderInsightCount}`}
          data={orderInsightDetail}
          columns={tableColumns}
          loading={isPending}
        />
      </Card>
      <InsightDetailModal selectedInsight={selectedInsight} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default InsightInquiryTable;

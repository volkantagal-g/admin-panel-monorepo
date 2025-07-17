import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { Modal, Row, Col, Divider, Button } from 'antd';

import AntTable from '@shared/components/UI/AntTable';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { t } from '@shared/i18n';
import { FOOD_INSIGHT_REFUND_STATUS_STYLE, FOOD_SHOW_DETAIL_TABLE_BY_REFUND_TYPE } from '@shared/shared/constants';
import useStyles from '@app/pages/GetirFood/OrderDetail/styles';
import { getInsightRefundStatus } from '@app/pages/GetirFood/OrderDetail/util';
import { tableColumns } from './config';
import { populateInsight } from './util';

const InsightDetailModal = ({ selectedInsight, isModalVisible, setIsModalVisible }) => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { refundList, inspect } = populateInsight({ orderDetail, selectedInsight });
  const { insightStatus, insightStatusString } = getInsightRefundStatus(
    { selectedInsight, isRefundPending: orderDetail.isRefundPending, isRefunded: orderDetail.isRefunded },
  );

  const classes = useStyles();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.TITLE')}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="insightDetailModalClose" type="danger" onClick={handleCancel}>
          {t('global:BACK')}
        </Button>,
      ]}
    >
      <Row gutter={[6, 12]}>
        <Col span={24} sm={6}>
          <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.OPERATION_USER')}: </strong>
        </Col>
        <Col span={24} sm={18}>
          {get(inspect, ['createdBy', 'name'], '')}
        </Col>
        <Col span={24} sm={6}>
          <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.SOURCE')}: </strong>
        </Col>
        <Col span={24} sm={18}>
          {get(inspect, 'sourceName', '')}
        </Col>
        <Col span={24} sm={6}>
          <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.MAIN_REASON')}: </strong>
        </Col>
        <Col span={24} sm={18}>
          {get(inspect, 'selectedMainReason', '')}
        </Col>
        <Col span={24} sm={6}>
          <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.SUB_REASON')}: </strong>
        </Col>
        <Col span={24} sm={18}>
          {get(inspect, 'selectedSubReason', '')}
        </Col>
      </Row>
      {
        get(inspect, 'complaint') && (
          <>
            <Divider />
            <Row gutter={[6, 12]}>
              <Col span={24} sm={6}>
                <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.COMPLAINT_DETAILS')}: </strong>
              </Col>
              <Col span={24} sm={18}>
                {get(inspect, ['complaint', 'description'], '')}
              </Col>
            </Row>
          </>
        )
      }
      {
        get(inspect, 'refund') && (
          <>
            <Divider />
            <Row gutter={[6, 12]}>
              <Col span={24} sm={6}>
                <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.REFUND_STATUS')}: </strong>
              </Col>
              <Col span={24} sm={18}>
                <div className={
                  get(classes, FOOD_INSIGHT_REFUND_STATUS_STYLE[insightStatus], '')
                }
                >
                  {insightStatusString}
                </div>
              </Col>
              <Col span={24} sm={6}>
                <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.REFUND_TYPE')}: </strong>
              </Col>
              <Col span={24} sm={18}>
                {get(inspect, ['refund', 'refundTypeString'], '')}
              </Col>
              <Col span={24} sm={6}>
                <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.PROBLEM_SOURCE')}: </strong>
              </Col>
              <Col span={24} sm={18}>
                {get(inspect, ['refund', 'sourceString'], '')}
              </Col>
              <Col span={24} sm={6}>
                <strong>{t('foodOrderPage:ORDER_FEEDBACKS_DETAIL_MODAL.REFUND_REASON')}: </strong>
              </Col>
              <Col span={24} sm={18}>
                {get(inspect, ['refund', 'description'], '')}
              </Col>
              {
                get(inspect, ['refund', 'products']) && get(inspect, ['refund', 'refundType']) === FOOD_SHOW_DETAIL_TABLE_BY_REFUND_TYPE &&
                (
                  <AntTable
                    title={`${t('foodOrderPage:ORDER_FEEDBACKS.TITLE')}`}
                    data={refundList}
                    columns={tableColumns}
                    loading={isPending}
                  />
                )
              }
            </Row>
          </>
        )
      }
    </Modal>
  );
};

export default InsightDetailModal;

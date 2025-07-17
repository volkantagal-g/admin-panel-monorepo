import { Descriptions, Modal, List, Typography, Tag, Timeline, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { columns } from './config';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { STATUS_TAG_COLOR_MAP } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/constants';
import { selectedRowsSelector } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/redux/selectors';
import JsonModal from '@shared/components/UI/JsonModal';
import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

const { Text } = Typography;

export default function DetailModal({ isModalVisible, setIsModalVisible }) {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const selectedRowsData = useSelector(selectedRowsSelector.getSelectedRows);
  const [isJsonVisible, setIsJsonVisible] = useState(false);
  const orderId = selectedRowsData[0]?.orderId;
  const reconciliationResponse = get(selectedRowsData, '0.reconciliationResponse', {});
  const transactions = selectedRowsData[0]?.transactions;
  const refundResponseDetails = selectedRowsData[0]?.refundResponse?.refundResponseDetails;

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleJsonCancel = () => {
    setIsJsonVisible(false);
  };

  const handleJsonOk = () => {
    setIsJsonVisible(true);
  };

  return (
    <Modal
      width="100%"
      title={t('REPORT_DETAIL.MAIN_TITLE')}
      visible={isModalVisible}
      onCancel={handleCancel}
      zIndex={SIDEBAR_Z_INDEX + 1}
      footer={(
        <>
          <Button type="secondary" onClick={handleJsonOk}>
            JSON
          </Button>
          <Button type="primary" onClick={handleOk}>
            OK
          </Button>
        </>
      )}
    >
      <Row>
        <Col span={12}>
          <GeneralInfo t={t} orderId={orderId} />
          <ReconciliationResponse t={t} reconciliationResponse={reconciliationResponse} />
        </Col>
        <Col span={12}>
          <RefundResponseDetails t={t} refundResponseDetails={refundResponseDetails} />
        </Col>
      </Row>
      <Transactions t={t} transactions={transactions} />
      <JsonModal
        title={t('REPORT_DETAIL.MAIN_TITLE')}
        data={selectedRowsData}
        visible={isJsonVisible}
        handleCancel={handleJsonCancel}
        zIndex={SIDEBAR_Z_INDEX + 2}
      />
    </Modal>
  );
}

// TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
DetailModal.prototype = { selectedData: PropTypes.array, isModalVisible: PropTypes.bool, setIsModalVisible: PropTypes.func };

const GeneralInfo = ({ orderId, t }) => {
  return (
    <Descriptions title={t('REPORT_DETAIL.GENERAL_INFO')}>
      <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label={t('REPORT_DETAIL.ORDER_ID')}>
        <Text data-testid="general-info-order-id">  {orderId} </Text>
      </Descriptions.Item>
    </Descriptions>
  );
};

const ReconciliationResponse = ({ reconciliationResponse, t }) => {
  return (
    <Descriptions layout="vertical" title={t('REPORT_DETAIL.RECONCILIATION_RESPONSE')}>
      <Descriptions.Item className="w-100" labelStyle={{ fontWeight: 'bold' }} label={t('REPORT_DETAIL.REASON_FOR_DISAGREEMENT')}>
        {reconciliationResponse?.reasonsForDisagreement
         && t(`bankReconciliationReportPage:DISAGREEMENT_NOTES.${reconciliationResponse.reasonsForDisagreement}`)}
      </Descriptions.Item>
      <Descriptions.Item className="w-100" labelStyle={{ fontWeight: 'bold' }} label={t('REPORT_DETAIL.ALL_SUITABLE_REASONS')}>
        <List
          dataSource={reconciliationResponse?.allSuitableReasons ? reconciliationResponse?.allSuitableReasons : []}
          renderItem={item => (
            item && (
            <div>
              {t(`bankReconciliationReportPage:DISAGREEMENT_NOTES.${item}`)}
            </div>
            )
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const Transactions = ({ transactions, t }) => {
  return (
    <Descriptions title={t('REPORT_DETAIL.TRANSACTIONS')}>
      <Descriptions.Item style={{ overflow: 'auto' }} className="w-100">
        <AntTableV2
          data={transactions}
          columns={columns(t)}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const RefundResponseDetails = ({ refundResponseDetails, t }) => {
  return (
    <Descriptions title={t('REPORT_DETAIL.REFUND_RESPONSE_DETAIL')}>
      <Descriptions.Item className="w-100">
        <Timeline mode="left" className="w-100">
          {
            refundResponseDetails?.map(refundResponse => {
              const amount = refundResponse?.amount;
              const source = refundResponse?.source;
              const date = refundResponse?.refundDate ? formatUTCDate(refundResponse.refundDate, DEFAULT_TIME_FORMAT) : null;
              const refundStatus = refundResponse?.refundStatus;
              const transactionId = refundResponse?.transactionId;
              const refundDate = refundResponse?.refundDate;

              return (
                <Timeline.Item
                  label={(
                    <>
                      <div className="d-flex flex-row justify-content-end align-items-center">
                        {date && (
                        <div className="mr-2">{date}</div>
                        )}
                        <Tag
                          color={
                            STATUS_TAG_COLOR_MAP[refundResponse?.refundStatus]
                          }
                        > {refundResponse?.refundStatus}
                        </Tag>
                      </div>
                      <p className="mt-2 mr-2"> {refundResponse?.errorMessage}</p>
                    </>
                  )}
                  key={refundStatus + transactionId + refundDate}
                >
                  <div className="d-flex flex-row gap-1">
                    <CopyToClipboard message={refundResponse?.transactionId} />
                    {amount && (
                      <Tag
                        color={
                          STATUS_TAG_COLOR_MAP[refundResponse?.refundStatus]
                        }
                      > {amount}
                      </Tag>
                    )}
                  </div>
                  {source && (
                    <p className="mt-2">
                      {source}
                    </p>
                  )}
                </Timeline.Item>
              );
            })
          }
        </Timeline>
      </Descriptions.Item>
    </Descriptions>
  );
};

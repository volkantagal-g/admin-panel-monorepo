import { Button, Card, Col, Row, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorDetailTable from './components/ErrorDetailTable';
import ProgressCard from './components/ProgressCard';

const { Text } = Typography;

export default function DetailCard({ data }) {
  const [isErrorTableVisible, setIsErrorTableVisible] = useState(false);
  const { t } = useTranslation(['payoutsForDomains', 'global']);

  const { Bank, Vertical, Country, BankIca, Received, Successful, InProgress, Errors } = data;

  const { TotalAmount: receivedTotalAmount, TotalCount: receivedTotalCount } = Received;

  return (
    <Card title={Bank} className="mt-4">
      <Row gutter={[16, 16]}>
        <Col md={6} xs={12}>
          <Card size="small" title="General" data-testid="payouts-general-info-box" headStyle={{ minHeight: 40 }}>
            <div className="d-flex justify-content-between mb-2">
              <Text type="secondary"> {t('payoutsForDomains:VERTICAL')} </Text>
              <Text> {Vertical} </Text>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Text type="secondary"> {t('global:COUNTRY')} </Text>
              <Text> {Country} </Text>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Text type="secondary"> {t('payoutsForDomains:BANK_ICA')} </Text>
              <Text> {BankIca} </Text>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Text type="secondary"> {t('payoutsForDomains:TOTAL_COUNT')} </Text>
              <Text> {receivedTotalCount} </Text>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Text type="secondary"> {t('payoutsForDomains:TOTAL_AMOUNT')} </Text>
              <Text> {receivedTotalAmount} </Text>
            </div>
          </Card>
        </Col>
        <Col md={6} xs={12}>
          <ProgressCard title={t('payoutsForDomains:SUCCESSFUL')} progressData={Successful} />
        </Col>
        <Col md={6} xs={12}>
          <ProgressCard
            title={t('payoutsForDomains:ERRORS')}
            progressData={Errors}
            extra={<Button size="small" onClick={() => setIsErrorTableVisible(!isErrorTableVisible)}> {t('payoutsForDomains:DETAIL')} </Button>}
          />
        </Col>
        <Col md={6} xs={12}>
          <ProgressCard title={t('payoutsForDomains:IN_PROGRESS')} progressData={InProgress} />
        </Col>
      </Row>
      <ErrorDetailTable isVisible={isErrorTableVisible} errors={Errors.FailedRecordInDetails} />
    </Card>
  );
}

import { Col, Row, Typography, Tag, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { PAYOUT_SUMMARY_STATUS_VALUES } from '@app/pages/TipPayback/PayoutSummaryList/constants';
import { summaryDetailsSelector } from '../../redux/selectors';
import useStyles from '../styles';

const { Title, Text } = Typography;
const Stats = () => {
  const classes = useStyles();
  const { t } = useTranslation(['payoutSummaryPage']);

  const summaryDetailsTotalAmount = useSelector(summaryDetailsSelector.getTotalAmount);
  const summaryDetailsTotalPaidAmount = useSelector(summaryDetailsSelector.getTotalPaidAmount);
  const summaryDetailsTotalUnPaidAmount = useSelector(summaryDetailsSelector.getTotalUnpaidAmount);
  const summaryDetailsPayoutSummaryStatus = useSelector(summaryDetailsSelector.getPayoutSummaryStatus);
  const summaryDetailsIsPending = useSelector(summaryDetailsSelector.getIsPending);

  return (
    <Row gutter={[12, 12]} className={classes.marginBottom16}>
      <Col span={6} md={6} xs={24}>
        <Row className={classes.statCard}>
          <Title className={classes.statTitle} level={4}>{t('PAYOUT_SUMMARY_STATUS')}</Title>
          {summaryDetailsIsPending ? <Skeleton.Button active /> : (
            PAYOUT_SUMMARY_STATUS_VALUES[summaryDetailsPayoutSummaryStatus] && (
            <Tag data-testid="payout-status" className={classes.statusTag} color={PAYOUT_SUMMARY_STATUS_VALUES[summaryDetailsPayoutSummaryStatus]?.color}>
              {t(`${PAYOUT_SUMMARY_STATUS_VALUES[summaryDetailsPayoutSummaryStatus]?.label}`)}
            </Tag>
            )
          )}
        </Row>
      </Col>
      <Col span={6} md={6} xs={24}>
        <Row className={classes.statCard}>
          <Title className={classes.statTitle} level={4}>{t('TOTAL_AMOUNT')}</Title>
          {summaryDetailsIsPending ? <Skeleton.Button active /> :
            summaryDetailsTotalAmount >= 0 &&
            <Text data-testid="payout-total-amount" className={classes.statDescription}> {summaryDetailsTotalAmount}₺ </Text>}
        </Row>
      </Col>
      <Col span={6} md={6} xs={24}>
        <Row className={classes.statCard}>
          <Title className={classes.statTitle} level={4}>{t('TOTAL_PAID_AMOUNT')}</Title>
          {
            summaryDetailsIsPending ? <Skeleton.Button active /> :
              summaryDetailsTotalPaidAmount >= 0 &&
              <Text data-testid="payout-total-paid-amount" className={classes.statDescription}> {summaryDetailsTotalPaidAmount}₺ </Text>
          }
        </Row>
      </Col>
      <Col span={6} md={6} xs={24}>
        <Row className={classes.statCard}>
          <Title className={classes.statTitle} level={4}>{t('TOTAL_UNPAID_AMOUNT')}</Title>
          {
            summaryDetailsIsPending ? <Skeleton.Button active /> :
              summaryDetailsTotalUnPaidAmount >= 0 &&
              <Text data-testid="payout-unpaid-amount" className={classes.statDescription}> {summaryDetailsTotalUnPaidAmount}₺ </Text>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default Stats;

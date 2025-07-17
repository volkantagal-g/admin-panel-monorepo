import { Col, Row, Typography, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { summaryFailReasonsSelector } from '../../redux/selectors';
import useStyles from '../styles';

const { Title, Text } = Typography;
const Stats = () => {
  const classes = useStyles();
  const { t } = useTranslation(['payoutSummaryPage']);

  const summaryFailReasonsTotalAmount = useSelector(summaryFailReasonsSelector.getTotalAmount);
  const summaryFailReasonsIsPending = useSelector(summaryFailReasonsSelector.getIsPending);

  return (
    <Row gutter={[12, 12]} className={classes.marginBottom16}>
      <Col span={6} md={6} xs={24}>
        <Row className={classes.statCard}>
          <Title level={4}>{t('TOTAL_AMOUNT')}</Title>
          {summaryFailReasonsIsPending ? <Skeleton.Button active /> :
            summaryFailReasonsTotalAmount >= 0 &&
            <Text className={classes.statDescription}> {summaryFailReasonsTotalAmount}₺ </Text>}
        </Row>
      </Col>
    </Row>
  );
};

export default Stats;

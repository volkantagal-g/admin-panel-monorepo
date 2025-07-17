import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Skeleton, Statistic, Tooltip, Card, Row, Col, Empty } from 'antd';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import { dashboardDataSelector } from '../../redux/selectors';
import { mapDataToDashboard } from '../../utils';
import useStyles from '../Filter/styles';

const Dashboard = () => {
  const dashboardDatas = useSelector(dashboardDataSelector.getData);
  const isDashboardDataPending = useSelector(dashboardDataSelector.getIsPending);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const classes = useStyles();
  const { t } = useTranslation(['dailyTrackingPage', 'global']);

  const [mappedData, setMappedData] = useState(null);

  const isPending = isDashboardDataPending || isCitiesPending;

  useEffect(() => {
    if (dashboardDatas.liveMapData.length || dashboardDatas.operationTimeSeriesData.length) {
      setMappedData(mapDataToDashboard(dashboardDatas));
    }
  }, [dashboardDatas]);

  if (isPending) {
    return (
      <Row gutter={[16, 16]} className={classes.row}>
        <Col md={{ span: 8 }} xs={{ span: 12 }}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} size="default" />
          </Card>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 12 }}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} size="default" />
          </Card>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 12 }}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} size="default" />
          </Card>
        </Col>
        <Col xs={{ span: 12 }}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} size="default" />
          </Card>
        </Col>
        <Col xs={{ span: 12 }}>
          <Card>
            <Skeleton active paragraph={{ rows: 1 }} size="default" />
          </Card>
        </Col>
      </Row>
    );
  }

  if (!mappedData) {
    return <Empty className={classes.empty} />;
  }

  return (
    <Row gutter={[16, 16]} className={classes.row}>
      <Col md={{ span: 8 }} xs={{ span: 12 }}>
        <Tooltip title={t('COMPLIANCE_DESC')}>
          <Card>
            <Statistic title={t('COMPLIANCE')} value={mappedData.compliance} precision={0} suffix="%" />
          </Card>
        </Tooltip>
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 12 }}>
        <Card>
          <Statistic title={t('BELOW_COURIER_PLAN')} value={mappedData.belowCourierPlan} precision={0} />
        </Card>
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 12 }}>
        <Card>
          <Statistic title={t('UTILIZATION')} value={mappedData.utilization} precision={0} suffix="%" />
        </Card>
      </Col>
      <Col xs={{ span: 12 }}>
        <Card>
          <Statistic
            title={t('BUSY')}
            loading={isPending}
            value={mappedData.busyWarehouseRatio}
            precision={0}
            suffix="%"
          />
        </Card>
      </Col>
      <Col xs={{ span: 12 }}>
        <Card>
          <Statistic title={t('TP')} value={mappedData.throughput} />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;

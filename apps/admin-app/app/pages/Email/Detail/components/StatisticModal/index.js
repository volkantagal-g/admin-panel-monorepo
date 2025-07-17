import { Button, Card, Col, Modal, Row, Skeleton, Statistic } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import theme from '@shared/jssTheme';
import { Creators } from '@app/pages/Email/Detail/redux/actions';
import { emailStatisticsSelector } from '@app/pages/Email/Detail/redux/selectors';

const StatisticModal = ({ isModalVisible, onCancel, emailId }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const statistics = useSelector(emailStatisticsSelector.getData);
  const isStatisticsPending = useSelector(emailStatisticsSelector.getIsPending);

  const getStatistics = useCallback(emailCampaignId => {
    dispatch(Creators.getStatisticsRequest({ emailId: emailCampaignId }));
  }, [dispatch]);

  return (
    <Modal
      title={(
        <>{t('STATISTICS')}
          <Button
            type="link"
            onClick={() => {
              getStatistics(emailId);
            }}
          >
            <SyncOutlined />
          </Button>
        </>
      )}
      visible={isModalVisible}
      onCancel={onCancel}
      width={560}
      footer={false}
    >
      <Skeleton paragraph={{ rows: 5 }} active loading={isStatisticsPending}>
        <Row gutter={16}>

          <Col lg={8}>
            <Card>
              <Statistic title={t('TOTAL')} value={statistics?.totalCount} />
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Statistic title={t('WAITING')} value={statistics?.waitingCount} />
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Statistic title={t('IN_QUEUE')} value={statistics?.queueCount} valueStyle={{ color: theme.color.status.warning }} />
            </Card>
          </Col>

        </Row>
        <Row className="mt-3" gutter={16}>

          <Col lg={8}>
            <Card>
              <Statistic title={t('SEND')} value={statistics?.sendingCount} valueStyle={{ color: theme.color.primary }} />
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Statistic title={t('FAILED')} value={statistics?.failCount} valueStyle={{ color: theme.color.status.danger }} />
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Statistic title={t('SUCCESS')} value={statistics?.successCount} valueStyle={{ color: theme.color.status.success }} />
            </Card>
          </Col>

        </Row>
      </Skeleton>

    </Modal>
  );
};

export default memo(StatisticModal);

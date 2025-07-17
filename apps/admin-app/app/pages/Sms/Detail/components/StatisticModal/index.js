import { Button, Card, Col, Modal, Row, Skeleton, Statistic, List } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import theme from '@shared/jssTheme';
import { Creators } from '@app/pages/Sms/Detail/redux/actions';
import { smsStatisticsSelector } from '@app/pages/Sms/Detail/redux/selectors';
import { getLangKey } from '@shared/i18n';
import { smsStatisticsFailReason } from '@app/pages/Sms/Detail/components/StatisticModal/constantValues';
import useStyles from '@app/pages/Sms/Detail/components/StatisticModal/styles';

const StatisticModal = ({ isModalVisible, onCancel, smsId }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const classes = useStyles();

  const statistics = useSelector(smsStatisticsSelector.getData);
  const isStatisticsPending = useSelector(smsStatisticsSelector.getIsPending);

  const getStatistics = useCallback(smsCampaignId => {
    dispatch(Creators.getStatisticsRequest({ smsId: smsCampaignId }));
  }, [dispatch]);

  return (
    <Modal
      title={(
        <>{t('STATISTICS')}
          <Button
            type="link"
            onClick={() => {
              getStatistics(smsId);
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

          <Col lg={12}>
            <Card>
              <Statistic title={t('SUCCESS')} value={statistics?.successCount} valueStyle={{ color: theme?.color?.status?.success }} />
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <Statistic title={t('FAILED')} value={statistics?.failCount} valueStyle={{ color: theme?.color?.status?.danger }} />
            </Card>
          </Col>

        </Row>
      </Skeleton>
      <Row className="mt-3">
        <Skeleton active loading={isStatisticsPending}>
          {statistics?.failStats && (
            <div
              id="scrollableDiv"
              className={classes.scrolledDiv}
            >
              <Col md={24}>
                <List header={<b>{t('FAIL_REASONS')}</b>}>
                  {
                    Object.keys(statistics?.failStats).map(statistic => (
                      <List.Item key={statistic}>
                        {get(smsStatisticsFailReason, [statistic, getLangKey()], '')}
                        <span className="float-right"><b>{statistics.failStats[statistic]}</b></span>
                      </List.Item>
                    ))
                  }
                </List>
              </Col>
            </div>
          )}
        </Skeleton>

      </Row>

    </Modal>
  );
};

export default memo(StatisticModal);

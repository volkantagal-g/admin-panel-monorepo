import { Button, Col, List, Modal, Row, Skeleton, Statistic } from 'antd';
import { memo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import { getStatisticsSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import { getLangKey } from '@shared/i18n';
import useStyles from '@app/pages/PushNotification/Detail/components/StatisticModal/styles';
import { notificationStatisticsFailReason } from '@app/pages/PushNotification/Detail/components/StatisticModal/constantValues';

// Modal handler can improve with react portal
const SendingUserInformationModal = ({ isModalVisible, onCancel, notificationId }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const classes = useStyles();

  const { data: statistics } = useSelector(getStatisticsSelector.getData);
  const isPending = useSelector(getStatisticsSelector.getIsPending);

  const getStatistics = useCallback(id => {
    dispatch(Creators.getStatisticsRequest({ notificationId: id }));
  }, [dispatch]);

  useEffect(() => {
    if (isModalVisible) {
      getStatistics(notificationId);
    }
  }, [getStatistics, isModalVisible, notificationId]);

  return (
    <Modal
      title={(
        <>{t('NOTIFICATION_STATISTICS')}
          <Button
            type="link"
            onClick={() => {
              getStatistics(notificationId);
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
      <Row>
        <Col xs={12}>
          <Skeleton paragraph={{ rows: 0 }} active loading={isPending}>
            <Statistic
              title={t('SUCCESSFULLY_SENT_NOTIFICATIONS')}
              value={statistics?.successCount}
              groupSeparator="."
              valueStyle={{ color: 'green' }}
            />
          </Skeleton>
        </Col>
        <Col xs={12}>
          <Skeleton paragraph={{ rows: 0 }} active loading={isPending}>
            <Statistic
              title={t('FAILED_SENT_NOTIFICATIONS')}
              value={statistics?.failCount}
              groupSeparator="."
              valueStyle={{ color: 'red' }}
            />
          </Skeleton>
        </Col>
      </Row>
      <Row className="mt-3">
        <Skeleton active loading={isPending}>
          {statistics?.failStats && (
            <div
              id="scrollableDiv"
              className={classes.scrolledDiv}
            >
              <Col md={24}>
                <List header={<div>{t('FAILED_SENT_NOTIFICATIONS')}</div>}>
                  {
                    Object.keys(statistics?.failStats).map(k => (
                      <List.Item key={k}>
                        {get(notificationStatisticsFailReason, [k, getLangKey()], '')}
                        <span className="float-right"><b>{statistics.failStats[k]}</b></span>
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

export default memo(SendingUserInformationModal);

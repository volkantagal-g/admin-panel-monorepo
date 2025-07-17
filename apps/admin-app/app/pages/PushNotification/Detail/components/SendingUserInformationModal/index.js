import { Button, Col, Modal, Row, Skeleton, Tag } from 'antd';
import { memo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import { getSampleUserListSelector, getTotalUserCountSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import { USER_INFORMATION_PROGRESS } from '@app/pages/PushNotification/constants';
import { getLangKey } from '@shared/i18n';
import { notificationProgressStatus } from '@app/pages/PushNotification/constantValues';

// Modal handler can improve with react portal
const SendingUserInformationModal = ({ isModalVisible, onCancel, notificationId }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const { data: sampleUserList } = useSelector(getSampleUserListSelector.getData);
  const isSampleListLoading = useSelector(getSampleUserListSelector.getIsPending);

  const { data: userCount } = useSelector(getTotalUserCountSelector.getData);
  const isUserCountLoading = useSelector(getTotalUserCountSelector.getIsPending);

  const getInformation = useCallback(id => {
    dispatch(Creators.getSampleUserListRequest({ notificationId: id }));
    dispatch(Creators.getTotalUserCountRequest({ notificationId: id }));
  }, [dispatch]);

  useEffect(() => {
    if (isModalVisible) {
      getInformation(notificationId);
    }
  }, [getInformation, isModalVisible, notificationId]);

  return (
    <Modal
      title={(
        <>{t('SENDING_USER_STATUS')}
          <Button
            type="link"
            onClick={() => {
              getInformation(notificationId);
            }}
          >
            <SyncOutlined />
          </Button>
        </>
      )}
      visible={isModalVisible}
      onCancel={onCancel}
      footer={null}
      width={560}
    >
      <Row>
        <Skeleton active loading={isUserCountLoading} paragraph={{ rows: 0 }}>
          <Col xs={24}>
            <span>{t('TOTAL_COUNT_USER_TITLE')} :
              {userCount?.status === USER_INFORMATION_PROGRESS.COMPLETE ?
                <b className="pl-3 text-success">{userCount?.count}</b>
                : get(notificationProgressStatus[userCount?.status], [getLangKey()], '')}
            </span>
          </Col>
        </Skeleton>
      </Row>
      <hr />
      <Row>
        <Col md={24}>
          <h6>{t('SAMPLE_USER_LIST')}</h6>
          <Skeleton active loading={isSampleListLoading}>
            {sampleUserList?.status === USER_INFORMATION_PROGRESS.COMPLETE ?
              (
                <Row>
                  {sampleUserList?.sampleUsers.map(sampleUser => (
                    <Col key={sampleUser} xs={24} md={8}>
                      <Tag className="mt-2" color="blue">
                        <a
                          target="_blank"
                          href={`/client/detail/${sampleUser}`}
                          rel="noreferrer"
                        >
                          {sampleUser}
                        </a>
                      </Tag>
                    </Col>
                  ))}
                </Row>
              ) : get(notificationProgressStatus[sampleUserList?.status], [getLangKey()], '')}
          </Skeleton>
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(SendingUserInformationModal);

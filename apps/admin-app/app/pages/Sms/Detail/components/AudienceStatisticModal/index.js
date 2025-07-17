import { Button, Col, Modal, Row, Skeleton, Tag } from 'antd';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { targetAudienceStatisticsSelector } from '@app/pages/Sms/Detail/redux/selectors';
import { STATISTIC_PROCESS } from '@app/pages/Sms/Detail/components/AudienceStatisticModal/constants';

const AudienceStatisticModal = ({ isModalVisible, onCancel, getAudienceStatistics }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const statistics = useSelector(targetAudienceStatisticsSelector.getData);
  const isStatisticsPending = useSelector(targetAudienceStatisticsSelector.getIsPending);

  useEffect(() => {
    getAudienceStatistics();
  }, [dispatch, getAudienceStatistics]);

  return (
    <Modal
      destroyOnClose
      title={(
        <>{t('SENDING_USER_INFORMATION')}
          <Button
            type="link"
            onClick={() => {
              getAudienceStatistics();
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
        <Row>
          <Col xs={24}>
            <span>
              {t('TOTAL_COUNT_USER')} : {statistics?.totalClientCount === STATISTIC_PROCESS.IN_PROGRESS ? t('PREPEARING') : statistics?.totalClientCount}
            </span>
          </Col>
        </Row>
        <hr />
        <Row>
          {statistics?.clientList?.map(sampleUser => (
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
      </Skeleton>
    </Modal>
  );
};

export default memo(AudienceStatisticModal);

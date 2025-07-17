import { Badge, Button, Tag, Tooltip, PageHeader as AntPageHeader, Skeleton } from 'antd';
import { get } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { FileDoneOutlined, LineChartOutlined, SendOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import useStyles from '@app/pages/Sms/Detail/components/PageHeader/styles';
import permKey from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';
import { getPageHeaderTagColor } from '@app/pages/Sms/utils';
import { processStatus } from '@app/pages/Sms/constantValues';
import { Creators } from '@app/pages/Sms/Detail/redux/actions';
import { smsStatisticsSelector, testSmsSelector } from '@app/pages/Sms/Detail/redux/selectors';
import TestSmsModal from '@app/pages/Sms/Detail/components/TestSmsModal';
import StatisticModal from '@app/pages/Sms/Detail/components/StatisticModal';
import AudienceStatisticModal from '@app/pages/Sms/Detail/components/AudienceStatisticModal';

const PageHeader = ({ smsDetail, isSmsDetailPending, isFormEditable, form, getAudienceStatistics }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const { t } = useTranslation('marketing');

  const [testSmsModalVisible, setTestSmsModalVisible] = useState(false);
  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);
  const [isAudienceStatisticModalVisible, setIsAudienceStatisticModalVisible] = useState(false);

  const statistics = useSelector(smsStatisticsSelector.getData);
  const isStatisticsPending = useSelector(smsStatisticsSelector.getIsPending);
  const isTestSmsPending = useSelector(testSmsSelector.getIsPending);

  useEffect(() => {
    if (smsDetail?.id) {
      dispatch(Creators.getStatisticsRequest({ smsId: smsDetail.id }));
    }
  }, [dispatch, smsDetail?.id]);

  return (
    <Skeleton loading={isSmsDetailPending} active className="px-5 py-2 bg-white" paragraph={{ rows: 1 }}>
      <AntPageHeader
        ghost={false}
        className={classes.header}
        title={t('SMS_DETAIL')}
        tags={<Tag color={getPageHeaderTagColor(smsDetail?.processStatus)}>{get(processStatus[smsDetail?.processStatus], getLangKey(), '')}</Tag>}
        subTitle={smsDetail?.id}
        extra={!isSmsDetailPending && [
          <Badge count={statistics?.successCount} overflowCount={99999} color="green" offset={[-100, 0]} key="STATISTIC_BADGE">
            <Button
              type="secondary"
              disabled={isFormEditable || isStatisticsPending}
              onClick={() => {
                setIsStatisticsModalVisible(true);
              }}
              icon={<LineChartOutlined />}
            >
              {t('STATISTICS')}
            </Button>
          </Badge>,
          <Button
            key="SENDING_USER_INFORMATION_BTN"
            type="secondary"
            disabled={isFormEditable || isStatisticsPending}
            onClick={() => {
              setIsAudienceStatisticModalVisible(true);
            }}
            icon={<FileDoneOutlined />}
          >
            {t('SENDING_USER_INFORMATION')}
          </Button>,
          canAccess(permKey.PAGE_SMS_CAN_TEST_CAMPAIGN) && (
            <Tooltip
              key="SEND_TEST_SMS_BTN"
              visible={isFormEditable}
              overlayClassName={`d-none ${isFormEditable ? 'd-lg-block' : ''}`}
              placement="rightTop"
              title={t('SEND_TEST_SMS_ALERT')}
            >
              <Button
                type="primary"
                disabled={isFormEditable || isTestSmsPending}
                onClick={() => {
                  setTestSmsModalVisible(true);
                }}
                icon={<SendOutlined />}
              >
                {t('CREATE_TEST_SMS')}
              </Button>
            </Tooltip>
          )]}
      />

      {canAccess(permKey.PAGE_SMS_CAN_TEST_CAMPAIGN) && (
        <TestSmsModal
          isModalVisible={testSmsModalVisible}
          smsId={smsDetail?.id}
          isFormEditable={isFormEditable}
          onCancel={() => {
            setTestSmsModalVisible(false);
          }}
        />
      )}

      <StatisticModal
        isModalVisible={isStatisticsModalVisible}
        smsId={smsDetail?.id}
        onCancel={() => {
          setIsStatisticsModalVisible(false);
        }}
      />

      <AudienceStatisticModal
        form={form}
        getAudienceStatistics={getAudienceStatistics}
        isModalVisible={isAudienceStatisticModalVisible}
        smsId={smsDetail?.id}
        onCancel={() => {
          setIsAudienceStatisticModalVisible(false);
        }}
      />
    </Skeleton>
  );
};

export default memo(PageHeader);

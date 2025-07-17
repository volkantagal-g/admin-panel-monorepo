import { Badge, Button, Tag, Tooltip, PageHeader as AntPageHeader, Skeleton } from 'antd';
import { get } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { FileDoneOutlined, LineChartOutlined, SendOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';
import { getPageHeaderTagColor } from '@app/pages/Email/utils';
import { emailProcessStatus } from '@app/pages/Email/constantValues';
import useStyles from '@app/pages/Email/Detail/components/PageHeader/styles';
import { Creators } from '@app/pages/Email/Detail/redux/actions';
import { emailStatisticsSelector, testEmailSelector } from '@app/pages/Email/Detail/redux/selectors';
import TestEmailModal from '@app/pages/Email/Detail/components/TestEmailModal';
import StatisticModal from '@app/pages/Email/Detail/components/StatisticModal';
import AudienceStatisticModal from '@app/pages/Email/Detail/components/AudienceStatisticModal';

const PageHeader = ({ emailDetail, isEmailDetailPending, isFormEditable, form, getAudienceStatistics }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const { canAccess } = usePermission();

  const [testEmailModalVisible, setTestEmailModalVisible] = useState(false);
  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);
  const [isAudienceStatisticModalVisible, setIsAudienceStatisticModalVisible] = useState(false);

  const statistics = useSelector(emailStatisticsSelector.getData);
  const isStatisticsPending = useSelector(emailStatisticsSelector.getIsPending);
  const isTestEmailPending = useSelector(testEmailSelector.getIsPending);

  useEffect(() => {
    if (emailDetail?.id) {
      dispatch(Creators.getStatisticsRequest({ emailId: emailDetail.id }));
    }
  }, [dispatch, emailDetail?.id]);

  return (
    <Skeleton loading={isEmailDetailPending} active className="px-5 py-2 bg-white" paragraph={{ rows: 1 }}>
      <AntPageHeader
        ghost={false}
        className={classes.header}
        title={t('EMAIL_DETAIL')}
        tags={(
          <Tooltip placement="top" title={emailDetail?.failReason}>
            <Tag color={getPageHeaderTagColor(emailDetail?.processStatus)}>{get(emailProcessStatus[emailDetail?.processStatus], getLangKey(), '')}
              {emailDetail?.failReason && <QuestionCircleOutlined className="ml-1" />}
            </Tag>
          </Tooltip>
        )}
        subTitle={emailDetail?.id}
        extra={!isEmailDetailPending && [
          <Badge count={statistics?.successCount} overflowCount={99999} color="green" offset={[-100, 0]}>
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
            type="secondary"
            disabled={isFormEditable || isStatisticsPending}
            onClick={() => {
              setIsAudienceStatisticModalVisible(true);
            }}
            icon={<FileDoneOutlined />}
          >
            {t('SENDING_USER_INFORMATION')}
          </Button>,
          canAccess(permKey.PAGE_EMAIL_CAN_TEST_CAMPAIGN) && (
            <Tooltip
              key="0"
              visible={isFormEditable}
              overlayClassName={`d-none ${isFormEditable ? 'd-lg-block' : ''}`}
              placement="rightTop"
              title={t('SEND_TEST_EMAIL_ALERT')}
            >
              <Button
                type="primary"
                disabled={isFormEditable || isTestEmailPending}
                onClick={() => {
                  setTestEmailModalVisible(true);
                }}
                icon={<SendOutlined />}
              >
                {t('CREATE_TEST_EMAIL')}
              </Button>
            </Tooltip>
          ),
        ]}
      />

      {canAccess(permKey.PAGE_EMAIL_CAN_TEST_CAMPAIGN) && (
        <TestEmailModal
          mainForm={form}
          isModalVisible={testEmailModalVisible}
          emailId={emailDetail?.id}
          isFormEditable={isFormEditable}
          onCancel={() => {
            setTestEmailModalVisible(false);
          }}
        />
      )}

      <StatisticModal
        isModalVisible={isStatisticsModalVisible}
        emailId={emailDetail?.id}
        onCancel={() => {
          setIsStatisticsModalVisible(false);
        }}
      />

      <AudienceStatisticModal
        form={form}
        getAudienceStatistics={getAudienceStatistics}
        isModalVisible={isAudienceStatisticModalVisible}
        emailId={emailDetail?.id}
        onCancel={() => {
          setIsAudienceStatisticModalVisible(false);
        }}
      />
    </Skeleton>
  );
};

export default memo(PageHeader);

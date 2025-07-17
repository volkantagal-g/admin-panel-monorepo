// library imports
import { Suspense, lazy, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Tooltip, Space, Empty, Spin, Divider } from 'antd';
import { InfoCircleFilled, WarningFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// local imports
import { marketBusinessConfigsSelector } from '@app/pages/Market/BusinessConfig/redux/selectors';
import { marketBusinessConfigFields } from '@app/pages/Market/BusinessConfig/constants';

// constants
const { Text } = Typography;
const MessageForm = lazy(() => import('@app/pages/Market/BusinessConfig/components/MessageForm'));
const AgressionLevelSettingForm = lazy(() => import('@app/pages/Market/BusinessConfig/components/AgressionLevelSettingForm'));
const QueueAndTimeSettingForm = lazy(() => import('@app/pages/Market/BusinessConfig/components/QueueAndTimeSettingForm'));

const ConfigItem = ({
  isEditEligible = false,
  configField = '',
  configKeyForDomain = {},
}) => {
  const { t } = useTranslation(['businessConfig']);
  const marketBusinessConfigsData = useSelector(marketBusinessConfigsSelector.getData);
  const notFoundConfigs = marketBusinessConfigsData?.notFoundConfigs || [];
  const notFoundConfigIndex = notFoundConfigs.findIndex(notFoundConfig => notFoundConfig?.key?.toLowerCase() === configKeyForDomain?.key?.toLowerCase());
  const isNotFound = notFoundConfigIndex > -1;

  const configKeyEditForm = useMemo(() => {
    if (isNotFound) {
      return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
    }

    switch (true) {
      case configField === marketBusinessConfigFields.MESSAGES:
        return (
          <Suspense fallback={<Spin size="large" />}>
            <MessageForm
              isEditEligible={isEditEligible}
              configUnit={`${configField}-${configKeyForDomain.key}`}
            />
          </Suspense>
        );
      case configField === marketBusinessConfigFields.BATCH_QUEUE_TIME_ESTIMATION:
        return (
          <Suspense fallback={<Spin size="large" />}>
            <QueueAndTimeSettingForm
              isEditEligible={isEditEligible}
              configUnit={`${configField}-${configKeyForDomain.key}`}
            />
          </Suspense>
        );
      case configField === marketBusinessConfigFields.MANUAL_WAREHOUSE_AGGRESSION_LEVELS:
        return (
          <Suspense fallback={<Spin size="large" />}>
            <AgressionLevelSettingForm
              isEditEligible={isEditEligible}
              configUnit={`${configField}-${configKeyForDomain.key}`}
            />
          </Suspense>
        );
      default:
        return (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        );
    }
  }, [isNotFound, configField, isEditEligible, configKeyForDomain.key]);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Space>
          {(configKeyForDomain?.description) && (
            <Tooltip title={configKeyForDomain?.description}>
              <InfoCircleFilled />
            </Tooltip>
          )}
          <Text copyable code>{configKeyForDomain?.key}</Text>
          {isNotFound && (
            <Tooltip title={t('WARNING.NO_ACTIVE_CONFIG_KEY')}>
              <WarningFilled />
            </Tooltip>
          )}
        </Space>
      </Divider>
      {configKeyEditForm}
    </>
  );
};

export default ConfigItem;

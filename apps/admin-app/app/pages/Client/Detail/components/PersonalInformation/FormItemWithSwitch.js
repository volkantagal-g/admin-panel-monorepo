import { Form, Spin, Switch } from 'antd';

import { useTranslation } from 'react-i18next';

const CustomSwitch = ({
  isCommPrefPending,
  loading,
  hasValidData,
  defaultChecked,
  checkedChildren,
  unCheckedChildren,
  onChange,
}) => {
  if (isCommPrefPending) return <Spin data-testid="spinner" size="small" />;

  if (!hasValidData) {
    return (
      <Switch
        data-testid="form-item-switch"
        loading={loading}
        disabled
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    );
  }
  return (
    <Switch
      data-testid="form-item-switch"
      loading={loading}
      defaultChecked={defaultChecked}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
      onChange={onChange}
    />
  );
};

export const FormItemWithSwitch = ({
  name,
  isCommPrefPending,
  attributeKey,
  loading,
  commPrefData = {},
  handleMarketingCommunications,
}) => {
  const { t } = useTranslation('clientDetail');
  const LABEL_BY_NAME = {
    email: t('CLIENT_META.MARKETING_COMMUNICATIONS.EMAIL_COMMUNICATIONS'),
    sms: t('CLIENT_META.MARKETING_COMMUNICATIONS.SMS_COMMUNICATIONS'),
    phone: t('CLIENT_META.MARKETING_COMMUNICATIONS.PHONE_COMMUNICATIONS'),
    ntf: t('CLIENT_META.MARKETING_COMMUNICATIONS.NTF_COMMUNICATIONS'),
  };

  return (
    <Form.Item label={LABEL_BY_NAME[name]} name={name}>
      <CustomSwitch
        isCommPrefPending={isCommPrefPending}
        loading={loading}
        hasValidData={attributeKey in commPrefData}
        defaultChecked={commPrefData?.[attributeKey]}
        checkedChildren={t('CLIENT_META.MARKETING_COMMUNICATIONS.OPTED_IN')}
        unCheckedChildren={t('CLIENT_META.MARKETING_COMMUNICATIONS.OPTED_OUT')}
        onChange={checked => handleMarketingCommunications(name, checked)}
      />
    </Form.Item>
  );
};

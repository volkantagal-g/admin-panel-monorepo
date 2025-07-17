import { Popconfirm } from 'antd';

import { Trans, useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { getirDomainTypesAllShortcuts } from '@shared/shared/constantValues';
import { Button } from '@shared/components/GUI';

function ConfirmButton({ onConfirm, domainType, isLoading }) {
  const { t } = useTranslation();
  const domainTypeName =
    getirDomainTypesAllShortcuts?.[domainType]?.[getLangKey()];
  return (
    <Popconfirm
      title={(
        <Trans
          i18nKey="feeDetailsPage:CONFIRM_TEXT"
          values={{ domainTypeName }}
        />
      )}
      okText={t('global:OK')}
      cancelText={t('global:CANCEL')}
      onConfirm={onConfirm}
      placement="topLeft"
    >
      <Button
        size="small"
        disabled={isLoading}
        loading={isLoading}
        icon={<CheckOutlined />}
        type="primary"
      >
        {t('global:SAVE')}
      </Button>
    </Popconfirm>
  );
}

export default ConfirmButton;

import { memo, useState } from 'react';
import { PageHeader, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import GlobalSettingsDrawer from '@app/pages/Sms/List/components/GlobalSettingsDrawer';
import { Creators } from '@app/pages/Sms/List/redux/actions';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { t } = useTranslation('marketing');
  const [showGlobalSettingsDrawer, setShowGlobalSettingsDrawer] = useState(false);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  return (
    <>
      <PageHeader
        ghost={false}
        className="mb-3"
        title={t('SMS_LIST')}
        extra={[
          canAccess(permKey.PAGE_SMS_GLOBAL_RULESET_PANE) ? (
            <Button
              type="secondary"
              icon={<SettingOutlined />}
              key="GLOBAL_RULESET_BTN"
              onClick={() => {
                dispatch(Creators.getGlobalSettingsRequest());
                setShowGlobalSettingsDrawer(true);
              }}
            >
              {t('GLOBAL_RULESET')}
            </Button>
          ) : null,
          <Link key="NEW_SMS_BTN" to={ROUTE.SMS_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_SMS')}
            </Button>
          </Link>,
        ]}
      />
      <GlobalSettingsDrawer destroyOnClose visible={showGlobalSettingsDrawer} setVisible={setShowGlobalSettingsDrawer} />
    </>

  );
};

export default memo(Header);

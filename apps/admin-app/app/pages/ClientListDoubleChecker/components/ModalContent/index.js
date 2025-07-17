import { Checkbox, Space } from 'antd';
import Text from 'antd/lib/typography/Text';

import useStyles from './styles';

export default function ModalContent({ t, csvFileName, clientListName, isEmailAllowed, isSMSAllowed, isNotifAllowed }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <label className={classes.label}>
        {t('global:FILE_NAME')}:
        <input type="text" value={csvFileName} readOnly className={classes.text} />
      </label>
      <label className={classes.label}>
        {t('LIST_NAME')}:
        <input type="text" value={clientListName} readOnly className={classes.text} />
      </label>
      <Space direction="vertical">
        <Checkbox checked={isEmailAllowed}>{t('EMAIL_PERMISSION')}</Checkbox>
      </Space>
      <Space direction="vertical">
        <Checkbox checked={isSMSAllowed}>{t('SMS_PERMISSION')}</Checkbox>
      </Space>
      <Space direction="vertical">
        <Checkbox checked={isNotifAllowed}>{t('NOTIF_PERMISSION')}</Checkbox>
      </Space>
      <Text className={classes.confirmText}>{t('CONFIRM_TEXT')}</Text>
    </div>
  );
}

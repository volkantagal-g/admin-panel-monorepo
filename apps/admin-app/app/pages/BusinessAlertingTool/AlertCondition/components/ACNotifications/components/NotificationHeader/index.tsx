import { useTranslation } from 'react-i18next';
import { Col, Form, Popconfirm, Row, Switch } from 'antd';

import { useEffect, useState } from 'react';

import useStyles from './styles';

type NotificationHeaderProps = {
  title: string;
  description?: string;
  notificationChannel: string;
  setFieldValue: any;
  isFormEditable: boolean | undefined;
  antdForm: any;
}

function NotificationHeader({
  title,
  description,
  notificationChannel,
  setFieldValue,
  isFormEditable,
  antdForm,
}: NotificationHeaderProps) {
  const classes = useStyles();
  const { t } = useTranslation(['global', 'batAlertConditionCommon']);
  const [isSwitchChecked, setSwitchChecked] = useState<boolean>(false);

  // We do not have watchers due to antd introduce watcher option in antd v4.20.0 and later.
  // But we need to bind switch value into state so that we can manage according to popconfirm
  // result. That is the reason why I'm using extra render cycle and call setter inside useEffect.
  const formSwitchValue = antdForm.getFieldValue(['notificationPreferences', `${notificationChannel}`, 'isActive']);

  useEffect(() => {
    setSwitchChecked(formSwitchValue);
  }, [formSwitchValue]);

  return (
    <Row>
      <Col xs={24}>
        <div className={classes.notifHeaderContainer}>
          <Form.Item
            noStyle
            name={['notificationPreferences', `${notificationChannel}`, 'isActive']}
            valuePropName="checked"
          >
            <Popconfirm
              title={t('batAlertConditionCommon:RECEIVER_DELETION_WARNING')}
              onConfirm={onSwitchChangeHandler}
              disabled={!isSwitchChecked}
            >
              <Switch
                checked={isSwitchChecked}
                checkedChildren={t('global:ACTIVE')}
                unCheckedChildren={t('global:INACTIVE')}
                onChange={!isSwitchChecked ? onSwitchChangeHandler : undefined}
                disabled={!isFormEditable}
              />
            </Popconfirm>
          </Form.Item>
          <div className={classes.notifTitleContainer}>
            <span className={classes.notifTitle}>{title}</span>
            <span className={classes.notifDescription}>{description}</span>
          </div>
        </div>
      </Col>
    </Row>
  );

  function onSwitchChangeHandler() {
    setSwitchChecked(prevChecked => {
      setFieldValue(['notificationPreferences', `${notificationChannel}`, 'isActive'], !prevChecked);

      if (prevChecked) {
        clearChannelInputs(notificationChannel);
      }

      return !prevChecked;
    });
  }

  function clearChannelInputs(notifChannel: any) {
    if (notificationChannel === 'email') {
      setFieldValue(['notificationPreferences', notifChannel, 'recipients'], []);
    }
    else if (notificationChannel === 'slack') {
      setFieldValue(['notificationPreferences', notifChannel, 'workspace'], null);
      setFieldValue(['notificationPreferences', notifChannel, 'channels'], []);
    }
  }
}

NotificationHeader.defaultProps = { description: false };

export default NotificationHeader;

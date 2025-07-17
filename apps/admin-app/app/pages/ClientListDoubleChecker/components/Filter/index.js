import { Modal, Input, Checkbox, Space, Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { fieldSelectors, uploadSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import ModalContent from '../ModalContent';

const { confirm } = Modal;

const { Text } = Typography;

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['clientListDoubleCheckerPage']);

  const pending = useSelector(uploadSelector.uploadIsPending);
  const csvData = useSelector(fieldSelectors.getCsvData);
  const csvFileName = useSelector(fieldSelectors.getCsvFileName);
  const clientListName = useSelector(fieldSelectors.getClientListName);
  const isEmailAllowed = useSelector(fieldSelectors.getIsEmailAllowed);
  const isSMSAllowed = useSelector(fieldSelectors.getIsSMSAllowed);
  const isNotifAllowed = useSelector(fieldSelectors.getIsNotifAllowed);

  const handleClientListChange = e => {
    dispatch(Creators.setClientListName({ clientListName: e.target.value }));
  };

  const handleTogglePermission = permissionKey => {
    dispatch(Creators.togglePermission({ permissionKey }));
  };

  const handleUpload = () => {
    const props = {
      t,
      csvFileName,
      clientListName,
      isEmailAllowed,
      isSMSAllowed,
      isNotifAllowed,
    };
    const data = { csvData, csvFileName, isEmailAllowed, isNotifAllowed, isSMSAllowed, clientListName };

    const confirmOptions = {
      title: t('MODAL_TITLE'),
      icon: <ExclamationCircleOutlined />,
      width: '50%',
      content: <ModalContent {...props} />,
      onOk() {
        dispatch(Creators.uploadClientListRequest({ data }));
      },
    };
    confirm(confirmOptions);
  };

  const buttonDisabled = !csvData || !csvFileName || !clientListName;
  return (
    <div>
      <Space direction="vertical" className={classes.container}>
        <Text>{`${t('LIST_NAME')}*`}</Text>
        <Input value={clientListName} onChange={handleClientListChange} placeholder={t('LIST_NAME')} type="text" />
      </Space>
      <Space direction="vertical" className={classes.permissionsContainer}>
        <Text>{t('PERMISSIONS')}</Text>
        <Space className={classes.checkboxesContainer}>
          <Space direction="horizontal" className={classes.container}>
            <Checkbox checked={isEmailAllowed} onChange={() => handleTogglePermission('isEmailAllowed')}>
              {t('EMAIL_PERMISSION')}
            </Checkbox>
          </Space>
          <Space direction="horizontal" className={classes.container}>
            <Checkbox checked={isSMSAllowed} onChange={() => handleTogglePermission('isSMSAllowed')}>
              {t('SMS_PERMISSION')}
            </Checkbox>
          </Space>
          <Space direction="horizontal" className={classes.container}>
            <Checkbox checked={isNotifAllowed} onChange={() => handleTogglePermission('isNotifAllowed')}>
              {t('NOTIF_PERMISSION')}
            </Checkbox>
          </Space>
        </Space>
      </Space>
      <Space className={classes.uploadButtonCont}>
        <Button disabled={buttonDisabled} onClick={handleUpload} loading={pending} type="primary" size="large">
          {t('global:UPLOAD')}
        </Button>
      </Space>
    </div>
  );
}

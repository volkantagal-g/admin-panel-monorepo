import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Row, Col, Collapse, Button } from 'antd';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { clientSelector, deviceSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import JsonModal from '@shared/components/UI/JsonModal';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_DEVICES_COMPONENT_COLLAPSE_';

const Devices = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const { canAccess } = usePermission();
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [modalDevice, setModalDevice] = useState({});
  const client = useSelector(clientSelector.getClient);
  const clientId = _.get(client, '_id');
  const clientDevices = useSelector(deviceSelector.getDevices);
  const isPending = useSelector(deviceSelector.isPending);

  const hasPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_BACK_OFFICE_ACTIONS);

  const blockOrUnblockDevice = device => {
    const { deviceId, isBlocked } = device;
    if (isBlocked) {
      return dispatch(Creators.unblockClientDeviceRequest({ deviceId }));
    }

    return dispatch(Creators.blockClientDeviceRequest({ deviceId }));
  };

  const logoutDevice = deviceId => dispatch(Creators.logoutClientDeviceRequest({ clientId, deviceId }));
  const showDeviceModal = device => {
    setModalDevice(device);
    setIsDeviceModalVisible(true);
  };

  let columns = tableColumns(classes, blockOrUnblockDevice, logoutDevice, showDeviceModal, hasPermission, t);
  columns = columns.filter(col => !col.hideColumn);

  useEffect(() => {
    if (clientId) {
      dispatch(Creators.getClientDevicesRequest({ clientId }));
    }
  }, [dispatch, clientId]);

  const getLogoutAllButton = () => (
    <Button
      size="small"
      onClick={event => {
        event.stopPropagation();
        dispatch(Creators.logoutFromAllClientDevicesRequest({ clientId }));
      }}
    >
      {t('LOGOUT_ALL')}
    </Button>
  );

  const handleDeviceModalCancel = () => {
    setIsDeviceModalVisible(false);
    setModalDevice({});
  };

  return (
    <>
      <JsonModal
        data={modalDevice}
        visible={isDeviceModalVisible}
        handleCancel={handleDeviceModalCancel}
        title={t('DEVICE.TITLE')}
      />
      <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
        <Panel
          showArrow={false}
          className={classes.noPanelPadding}
          header={t('DEVICE.TITLE')}
          key={`${COLLAPSE_KEY_PREFIX}1`}
          extra={hasPermission ? getLogoutAllButton() : <span />}
        >
          <Row>
            <Col span={24}>
              <AntTable
                data={clientDevices}
                columns={columns}
                loading={isPending}
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};

export default Devices;

import { Button, Col, Divider, Row } from 'antd';

export const tableColumns = (classes, blockOrUnblockDevice, logoutDevice, showDeviceModal, hasPermission = false, t) => ([
  {
    title: t('clientDetail:DEVICE.TABLE.COLUMNS.MODEL'),
    dataIndex: 'model',
    key: 'model',
    render: (model, device) => {
      const { deviceType } = device;
      return (
        <>
          {model} {deviceType}&nbsp;
          {hasPermission && (
            <Button
              size="small"
              onClick={() => showDeviceModal(device)}
            >
              JSON
            </Button>
          )}
        </>
      );
    },
  },
  {
    title: t('clientDetail:DEVICE.TABLE.COLUMNS.STATUS'),
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    width: hasPermission ? 90 : 200,
    render: isBlocked => (
      <>{ isBlocked ? t('clientDetail:BLOCKED_DEVICE') : t('clientDetail:ACTIVE_DEVICE') }</>
    ),
  },
  {
    title: t('clientDetail:DEVICE.TABLE.COLUMNS.USERS'),
    dataIndex: 'client',
    key: 'client',
    render: (client, { oldClients }) => (
      <>
        <Button
          type="link"
          size="small"
          href={`/client/detail/${client}`}
        >
          {client}
        </Button>
        <Divider className={classes.noMargin} />
        {
          oldClients.map(oldClient => (
            <>
              <Button
                type="link"
                size="small"
                href={`/client/detail/${oldClient}`}
              >
                {oldClient}
              </Button>
            </>
          ))
        }
      </>
    ),
  },
  {
    title: t('clientDetail:DEVICE.TABLE.COLUMNS.ACTIONS'),
    dataIndex: 'deviceId',
    key: 'deviceId',
    width: 200,
    hideColumn: !hasPermission,
    render: (deviceId, device) => {
      const { isBlocked } = device;
      return (
        <>
          <Row gutter={8}>
            <Col>
              <Button
                size="small"
                onClick={() => blockOrUnblockDevice(device)}
              >
                {isBlocked ? t('clientDetail:UNBLOCK_DEVICE') : t('clientDetail:BLOCK_DEVICE')}
              </Button>
            </Col>
            <Col>
              <Button
                size="small"
                onClick={() => logoutDevice(deviceId)}
              >
                {t('global:LOGOUT')}
              </Button>
            </Col>
          </Row>
        </>
      );
    },
  },
]);

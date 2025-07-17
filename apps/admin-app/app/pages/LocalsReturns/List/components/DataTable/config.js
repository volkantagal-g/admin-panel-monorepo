import { Button, Row, Typography } from 'antd';

import { ROUTE } from '@app/routes';
import { RETURN_STATUS_CODES, LOCALS_DELIVERY } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import RedirectText from '@shared/components/UI/RedirectText';

const { Text } = Typography;

const returnPrefix = 'localsReturnsPage:DATA_TABLE';

const splitDateAndTime = dateAndTime => {
  if (!dateAndTime) return '-';

  const splitted = dateAndTime.split(' ');

  return (
    <Text>
      {splitted[0]}
      <br />
      {splitted[1]}
    </Text>
  );
};

export const generateColumns = ({ openModalAndGetId, t, Can }) => {
  const rules = [
    {
      title: t(`${returnPrefix}:RETURN_CODE`),
      width: 80,
      dataIndex: 'returnCode',
      key: 'returnCode',
    },
    {
      title: t(`${returnPrefix}:ORDER_APPROVED_CODE`),
      dataIndex: 'confirmationId',
      key: 'confirmationId',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:RETURN_REQUEST_AMOUNT`),
      dataIndex: 'returnPrice',
      key: 'returnPrice',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:SHOP_NAME`),
      dataIndex: 'shopName',
      key: 'shopName',
      width: 120,
    },
    {
      title: t(`${returnPrefix}:CITY`),
      dataIndex: 'city',
      key: 'city',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:CUSTOMER`),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 50,
    },
    {
      title: t(`${returnPrefix}:WAREHOUSE_NAME`),
      key: 'warehouseId',
      width: 80,
      render: ({ warehouseName, warehouseId }) => {
        return (
          <RedirectText
            text={warehouseName}
            to={`/return/detail/${warehouseId}`}
            permKey={permKey.PAGE_GL_RETURN_ALERT_DETAIL}
            target="_blank"
          />
        );
      },
    },
    {
      title: t(`${returnPrefix}:COURIER_ID`),
      key: 'courierId',
      width: 80,
      render: ({ courierId, deliveryType }) => {
        const isGG = deliveryType === LOCALS_DELIVERY.GETIR;

        if (isGG && courierId) {
          return (
            <RedirectText
              text={courierId}
              to={`/courier/detail/${courierId}`}
              permKey={permKey.PAGE_COURIER_DETAIL}
              target="_blank"
            />
          );
        }
        return courierId;
      },
    },
    {
      title: t(`${returnPrefix}:RUNNER_ID`),
      dataIndex: 'runnerId',
      key: 'runnerId',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:DELIVER_DATE`),
      dataIndex: 'deliverDate',
      key: 'deliverDate',
      width: 30,
      render: deliverDate => {
        return splitDateAndTime(deliverDate);
      },
    },
    {
      title: t(`${returnPrefix}:REQUESTED_DATE`),
      dataIndex: 'requestedDate',
      width: 80,
      key: 'requestedDate',
      sorter: true,
      render: requestedDate => {
        return splitDateAndTime(requestedDate);
      },
    },
    {
      title: t(`${returnPrefix}:RETURN_SLOT`),
      dataIndex: 'selectedSlotDate',
      key: 'selectedSlotDate',
      width: 100,
      sorter: true,
      defaultSortOrder: 'descend',
      render: (selectedSlotDate, returnItem) => {
        return (
          <Text>
            {selectedSlotDate}
            <br />
            {returnItem?.selectedSlotTime}
          </Text>
        );
      },
    },
    {
      title: t(`${returnPrefix}:RETURN_STATUS`),
      dataIndex: 'statusDescription',
      key: 'statusDescription',
      width: 90,
    },
    {
      title: t(`${returnPrefix}:RETURN_TYPE`),
      dataIndex: 'deliveryTypeDescription',
      key: 'deliveryTypeDescription',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:USER_TYPE`),
      dataIndex: 'userType',
      key: 'userType',
      width: 80,
    },
    {
      title: t(`${returnPrefix}:LAST_ACTIVITY_TIME`),
      key: 'lastReturnActivityElapsedTime',
      dataIndex: 'lastReturnActivityElapsedTime',
      width: 90,
    },
    {
      title: t(`${returnPrefix}:RETURN_TIME`),
      key: 'totalReturnTime',
      dataIndex: 'totalReturnTime',
      width: 90,
    },
    {
      title: t('global:ACTION'),
      fixed: 'right',
      width: 140,
      render: record => {
        const orderId = record?.orderId;
        const id = record?.id;
        const { path } = ROUTE.ARTISAN_ORDER_DETAIL;
        const detailPageUrl = path.replace(':orderDetailId', orderId);

        return (
          <Row wrap={false}>
            <Button
              type="default"
              size="small"
              variant="contained"
              target="_blank"
              style={{ marginRight: 8 }}
              href={`${detailPageUrl}`}
            >
              <Text>{t('global:DETAIL')}</Text>
            </Button>
            {RETURN_STATUS_CODES[record.status] && (
              <Can permKey={permKey.PAGE_RETURN_LIST_RESPOND_THE_REQUEST}>
                <Button
                  type="default"
                  size="small"
                  onClick={() => openModalAndGetId(id)}
                  style={{ backgroundColor: '#01CC78' }}
                >
                  <Text>{t(`${returnPrefix}:RESPOND_THE_REQUEST`)}</Text>
                </Button>
              </Can>
            )}
          </Row>
        );
      },
    },
  ];

  return rules;
};

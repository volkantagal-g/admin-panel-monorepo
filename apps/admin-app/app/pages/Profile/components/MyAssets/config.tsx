import { TFunction } from 'react-i18next';
import moment from 'moment';
import { Badge } from 'antd';

const DATE_FORMAT = 'YYYY-MM-DD';

export const getTableColumns = ({ t }: { t: TFunction }) => [
  {
    title: t('profile:COMPONENTS.MY_ASSETS.DEVICE_NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 110,
    render: (name: string, record: any) => {
      const returnDateExist = !!record.returnDate;

      return (
        <>
          <Badge status={returnDateExist ? 'error' : 'success'} />
          {name}
        </>
      );
    },
  },
  {
    title: t('profile:COMPONENTS.MY_ASSETS.DEVICE_TYPE'),
    dataIndex: 'deviceType',
    key: 'deviceType',
    width: 110,
    render: (deviceType: string) => t(`assetPage:ASSET_TYPES.${deviceType}`),
  },
  {
    title: t('profile:COMPONENTS.MY_ASSETS.SERIAL_NUMBER'),
    dataIndex: 'deviceSerialNumber',
    key: 'deviceSerialNumber',
    width: 110,
  },
  {
    title: t('profile:COMPONENTS.MY_ASSETS.DATE_ASSIGNED_TO_EMPLOYEE'),
    dataIndex: 'assignDate',
    key: 'assignDate',
    width: 110,
    render: (assignDate: string) => (assignDate ? moment(assignDate).format(DATE_FORMAT) : '-'),
  },
  {
    title: t('profile:COMPONENTS.MY_ASSETS.DATE_OF_WITHDRAWAL_FROM_EMPLOYEE'),
    dataIndex: 'returnDate',
    key: 'returnDate',
    width: 110,
    render: (returnDate: string | undefined) => (returnDate ? moment(returnDate).format(DATE_FORMAT) : '-'),
  },
  {
    title: t('assetPage:DEVICE_MODEL'),
    dataIndex: ['deviceConfig', 'deviceModel'],
    key: 'deviceConfig.deviceModel',
    width: 110,
    render: (deviceModel: string | undefined) => (deviceModel || '-'),
  },
  {
    title: t('assetPage:STORAGE'),
    dataIndex: ['deviceConfig', 'storage'],
    key: 'deviceConfig.storage',
    width: 110,
    render: (storage: string | undefined) => (storage || '-'),
  },
  {
    title: t('assetPage:DISPLAY_SIZE'),
    dataIndex: ['deviceConfig', 'displaySize'],
    key: 'deviceConfig.displaySize',
    width: 110,
    render: (displaySize: string | undefined) => (displaySize ? `${displaySize}″` : '-'),
  },
  {
    title: t('assetPage:CHIP_TYPE'),
    dataIndex: ['deviceConfig', 'chipType'],
    key: 'deviceConfig.chipType',
    width: 110,
    render: (chipType: string | undefined) => (chipType || '-'),
  },
  {
    title: t('assetPage:RAM'),
    dataIndex: ['deviceConfig', 'ram'],
    key: 'deviceConfig.ram',
    width: 110,
    render: (ram: string | undefined) => (ram ? `${ram} GB` : '-'),
  },
  {
    title: t('assetPage:IMEI_1'),
    dataIndex: ['deviceConfig', 'imei1'],
    key: 'deviceConfig.imei1',
    width: 110,
    render: (imei1: string | undefined) => (imei1 || '-'),
  },
];

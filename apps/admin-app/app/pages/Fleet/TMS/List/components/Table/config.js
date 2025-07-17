import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import DetailButton from '@app/pages/Fleet/TMS/List/components/DetailsButton/index';
import DeleteButton from '@app/pages/Fleet/TMS/List/components/DeleteButton/index';

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('tmsPage:PLATE'),
      dataIndex: 'plate',
      width: '200px',
    },
    {
      title: t('tmsPage:VEHICLE_CLASS'),
      dataIndex: 'vehicleClass',
      width: '200px',
    },
    {
      title: t('tmsPage:VEHICLE_TYPE'),
      dataIndex: 'type',
      width: '200px',
    },
    {
      title: t('tmsPage:BRAND'),
      dataIndex: 'brand',
      width: '200px',
    },
    {
      title: t('tmsPage:MODEL_YEAR'),
      dataIndex: 'modelYear',
      width: '200px',
    },
    {
      title: t('global:ACTIVE'),
      dataIndex: 'active',
      width: '50px',
      render: obj => {
        const element = (
          obj ?
            <CheckOutlined style={{ color: 'green' }} />
            : <CloseOutlined style={{ color: 'red' }} />
        );
        return element;
      },
    },
    {
      key: '_id',
      title: t('tmsPage:ACTION'),
      width: '200px',
      render: obj => {
        return (
          <>
            <DetailButton id={obj._id} urlpath={`/tms/detail/${obj._id}`} />
            <DeleteButton id={obj._id} />
          </>
        );
      },
    },
  ];
};

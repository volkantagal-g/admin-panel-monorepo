import moment from 'moment';

import { DetailButton } from '@shared/components/UI/List';
import { imgArray } from '@app/pages/ArtisanOrder/Detail/util';
import { ROUTE } from '@app/routes';

export const tableColumns = ({ orderDetailId, courierReturnTasks, t }) => [
  {
    title: t('RETURN_DETAILS_TABLE.RESERVED_DATE'),
    dataIndex: 'requestedDate',
    key: 'requestedDate',
    render: requestedDate => moment(requestedDate).format('DD.MM.YYYY HH:mm:ss'),
  },
  {
    title: t('RETURN_DETAILS_TABLE.DOMAIN_TYPE'),
    key: 'domainType',
    render: () => {
      return t('DOMAIN_NAME');
    },
  },
  {
    title: t('RETURN_DETAILS_TABLE.BATCH_INDEX'),
    dataIndex: 'batchIndex',
    key: 'batchIndex',
    align: 'right',
    render: batchIndex => {
      if (courierReturnTasks?.length > 0) {
        const imgSrc = imgArray[batchIndex - 1];
        return (
          <span>
            {batchIndex}
            <span className="pl-2"><img src={imgSrc} alt="Logo" /></span>
          </span>
        );
      }
      return null;
    },
  },
  {
    title: '#',
    dataIndex: 'orderId',
    key: 'orderId',
    render: orderId => {
      if (orderId !== orderDetailId) {
        return DetailButton({
          _id: orderId,
          urlPath: ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', ''),
        });
      }
      return null;
    },
  },
];

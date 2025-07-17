import { Tag } from 'antd';
import moment from 'moment';

import { DetailButton } from '@shared/components/UI/List';
import { imgArray } from '@app/pages/ArtisanOrder/Detail/util';
import { ROUTE } from '@app/routes';
import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';

export const tableColumns = ({ orderDetailId, t, normalFont }) => [
  {
    title: t('ORDER_DETAILS_TABLE.CHECKOUT_DATE'),
    dataIndex: 'acceptedDate',
    key: 'acceptedDate',
    render: checkoutDate => moment(checkoutDate).format('DD.MM.YYYY HH:mm:ss'),
  },
  {
    title: '',
    dataIndex: 'orderId',
    key: 'orderId',
    render: orderId => {
      if (orderId === orderDetailId) {
        return <Tag color="purple">{t('ORDER_DETAILS_TABLE.THIS_ORDER')}</Tag>;
      }
      return null;
    },
  },
  {
    title: t('ORDER_DETAILS_TABLE.DOMAIN_TYPE'),
    dataIndex: 'domainType',
    key: 'domainType',
    render: domainType => {
      return (!domainType || domainType === GETIR_LOCALS_DOMAIN_TYPE)
        ? t('DOMAIN_NAME')
        : t('GETIR_FOOD_DOMAIN_NAME');
    },
  },
  {
    title: t('ORDER_DETAILS_TABLE.BATCH_INDEX'),
    dataIndex: 'batchIndex',
    key: 'batchIndex',
    align: 'right',
    render: batchIndex => {
      const imgSrc = imgArray[batchIndex - 1];
      return (
        <span className={normalFont}>
          {batchIndex}
          <span className="pl-2">
            <img src={imgSrc} alt="Logo" />
          </span>
        </span>
      );
    },
  },
  {
    title: '#',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (orderId, { domainType }) => {
      if (orderId !== orderDetailId) {
        const urlPath =
          (!domainType || domainType === GETIR_LOCALS_DOMAIN_TYPE)
            ? ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', '')
            : ROUTE.GETIR_FOOD_ORDER_DETAIL.path.replace(':orderDetailId', '');

        return DetailButton({
          _id: orderId,
          urlPath,
        });
      }
      return null;
    },
  },
];

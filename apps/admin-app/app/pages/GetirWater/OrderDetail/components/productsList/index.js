import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';

import { orderDetailSelector } from '../../redux/selectors';

import { tableColumns } from './config';

const ProductsList = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('waterOrderPage');

  const products = _.get(orderDetail, 'products', []);

  return (
    <Card>
      <AntTable title={t('PREVIOUS_ORDER.TITLE')} data={products} columns={tableColumns(t)} loading={isPending} />
    </Card>
  );
};

export default ProductsList;

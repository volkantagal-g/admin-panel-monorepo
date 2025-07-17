import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import _ from 'lodash';

import { Creators } from '../redux/actions';

const ProductActionButton = ({ filters, size = 'middle', className }) => {
  if (_.isEmpty(filters)) {
    throw new Error('Filters are required');
  }

  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  const onProductsClick = () => {
    dispatch(Creators.toggleIsProductsModalVisible());
    dispatch(Creators.getActiveOrdersProductsRequest({ data: filters }));
  };

  return (
    <Button type="primary" onClick={onProductsClick} size={size} className={className}>
      {t('PRODUCTS')}
    </Button>
  );
};

export default ProductActionButton;

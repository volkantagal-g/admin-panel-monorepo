import { useState, useMemo } from 'react';
import { Input, Modal, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { productsSelector, getIsProductsModalVisible } from '../redux/selectors';
import { Creators } from '../redux/actions';
import { t } from '@shared/i18n';
import ProductsListTable from '../Table';
import { filterProductsForName } from './utils';
import { isMobile } from '@shared/utils/common';
import useDebounce from '@shared/shared/hooks/useDebounce';

const ProductsListModal = () => {
  const dispatch = useDispatch();
  const [searchStr, setSearchStr] = useState('');
  const isUserDeviceMobile = isMobile();

  const DEBOUNCE_DELAY = 400; // Delay duration in ms
  const debouncedSearchStr = useDebounce(searchStr, DEBOUNCE_DELAY);

  const isVisible = useSelector(getIsProductsModalVisible);

  const isPending = useSelector(productsSelector.getIsPending);
  const products = useSelector(productsSelector.getData);

  const filteredProducts = useMemo(() => filterProductsForName(debouncedSearchStr, products), [debouncedSearchStr, products]);

  const onCancel = () => {
    setSearchStr('');
    dispatch(Creators.toggleIsProductsModalVisible());
  };

  const onSearchStrChange = e => {
    setSearchStr(e.target.value);
  };

  return (
    <Modal
      visible={isVisible}
      title={t('global:TOTAL_PRODUCTS_COUNT')}
      onCancel={onCancel}
      footer={null}
      width={isUserDeviceMobile ? '300px' : '800px'}
      centered
    >
      {isPending ? (
        <Spin />
      ) : (
        <>
          <Input type="text" placeholder={t('global:SEARCH')} onChange={onSearchStrChange} />
          <ProductsListTable products={filteredProducts} isMobile={isUserDeviceMobile} />
        </>
      )}
    </Modal>
  );
};
export default ProductsListModal;

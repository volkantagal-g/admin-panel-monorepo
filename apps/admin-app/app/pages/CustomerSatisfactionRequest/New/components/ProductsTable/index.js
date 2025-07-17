import { Row, Col, Button } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { createCustomerSatisfactionRequestSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';

import { getLangKey } from '@shared/i18n';

const initalPagination = {
  currentPage: 1,
  rowsPerPage: 10,
};
function ProductsTable({
  warehouseId,
  addProduct,
  products,
  onChange,
  search,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [pagination, setPagination] = useState(initalPagination);

  const productsList = useSelector(
    createCustomerSatisfactionRequestSelector.getProductsData,
  );

  const isLoading = useSelector(
    createCustomerSatisfactionRequestSelector.getIsFilterProductsPending,
  );

  const total = useSelector(
    createCustomerSatisfactionRequestSelector.getProductsTotal,
  );

  const getProducts = useCallback(paginationValue => {
    dispatch(
      Creators.filterProductsRequest({
        requestBody: {
          warehouseId,
          keyword: search || undefined,
          ...getLimitAndOffset(paginationValue),
          language: getLangKey(),
        },
      }),
    );
  }, [dispatch, search, warehouseId]);

  const onBringProducts = useCallback(() => {
    getProducts(initalPagination);
  }, [getProducts]);
  const handlePaginationChange = newPagination => {
    setPagination(newPagination);
    getProducts(newPagination);
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Button
          disabled={!warehouseId}
          onClick={onBringProducts}
          type="primary"
        >
          {t('customerSatisfactionPage:BRING_PRODUCTS')}
        </Button>
      </Col>
      <Col span={24}>
        <AntTableV2
          data={productsList}
          columns={getTableColumns({
            products,
            onChange,
            addProduct,
          })}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          loading={isLoading}
          total={total}
        />
      </Col>
    </Row>
  );
}

export default ProductsTable;

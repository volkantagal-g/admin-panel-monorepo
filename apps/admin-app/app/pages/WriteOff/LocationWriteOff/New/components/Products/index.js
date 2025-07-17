import { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { omit, isEmpty } from 'lodash';

import Summary from '../Summary';
import AntTable from '@shared/components/UI/AntTable';
import { productsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import InputSearchForm from '@app/pages/WriteOff/components/InputSearchForm';
import { getTableColumns } from './config';
import HelperText from '@shared/components/HelperText';
import { PRODUCT_STOCK_UNIT_TYPE } from '@shared/shared/constants';
import { MAX_COMMENT_LENGTH } from '../Form/formHelper';

function Products({
  warehouseId,
  locationBarcode,
  CSVProducts,
  onUpdateProducts,
  onValidateFields,
  onCleanCSVProducts,
}) {
  const { t } = useTranslation('writeOffPage');
  const dispatch = useDispatch();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const products = useSelector(productsSelector.getData);
  const isLoading = useSelector(productsSelector.getIsPending);

  const warehouseIdRef = useRef(null);
  const locationBarcodeRef = useRef(null);
  const countDecimals = value => {
    if (Math.floor(value) !== value) {
      return value?.toString()?.split('.')[1].length || 0;
    }
    return 0;
  };

  useEffect(() => {
    if (warehouseId !== warehouseIdRef.current || locationBarcode !== locationBarcodeRef.current) {
      dispatch(Creators.clearProducts());
      setSelectedProducts([]);
    }
    warehouseIdRef.current = warehouseId;
    locationBarcodeRef.current = locationBarcode;
  }, [dispatch, warehouseId, locationBarcode]);

  useEffect(() => {
    if (!isEmpty(CSVProducts)) {
      dispatch(Creators.getProductsRequest({ warehouseId, locationBarcodes: [locationBarcode], productIds: Object.keys(CSVProducts) }));
    }
  }, [CSVProducts, dispatch, warehouseId, locationBarcode]);

  useEffect(() => {
    let allAmountsValid = true;
    let allCommentsValid = true;
    const productRequest = Object.values(selectedProducts).map(product => {
      if (product?.comment?.length > MAX_COMMENT_LENGTH) {
        allCommentsValid = false;
      }
      if (!product.deleted) {
        allAmountsValid = false;
      }
      else if ((product.unit === PRODUCT_STOCK_UNIT_TYPE.PIECE && countDecimals(product.deleted) > 0) ||
        (product.unit === PRODUCT_STOCK_UNIT_TYPE.KILOGRAM && countDecimals(product.deleted) > 3)) {
        allAmountsValid = false;
      }
      return { productId: product._id, quantity: product.deleted, comment: product.comment };
    });
    onUpdateProducts(productRequest, allAmountsValid, allCommentsValid);
  }, [onUpdateProducts, selectedProducts]);

  const addProduct = ({ productId }) => {
    onValidateFields();
    if (selectedProducts[productId]) {
      dispatch(ToastCreators.error({ message: t('PRODUCT_IN_LIST_WARNING') }));
    }
    else if (warehouseId) {
      dispatch(Creators.getProductsRequest({ productIds: [productId], warehouseId, locationBarcodes: [locationBarcode] }));
      setSelectedProductId(productId);
    }
  };

  useEffect(() => {
    if (isEmpty(products)) {
      return;
    }
    const newSelection = {
      ...products,
      ...selectedProducts,
    };
    if (!isEmpty(CSVProducts)) {
      Object.keys(newSelection).forEach(id => {
        if (CSVProducts[id]) {
          newSelection[id].deleted = CSVProducts[id].amount;
          newSelection[id].comment = CSVProducts[id].comment;
        }
      });
      onCleanCSVProducts();
    }
    setSelectedProducts(newSelection);
    setSelectedProductId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const removeProductRow = productId => {
    dispatch(Creators.clearProducts());
    setSelectedProducts(omit(selectedProducts, [productId]));
  };

  const updateProductRow = product => {
    setSelectedProducts({ ...selectedProducts, [product._id]: product });
  };

  return (
    <div>
      <HelperText variant="primary">
        {t('DELETE_AMOUNT_INFORMATION')}
      </HelperText>
      <InputSearchForm
        onAddProduct={addProduct}
        selectedProductId={selectedProductId}
        isLoading={isLoading}
      />
      <Row>
        <Col span={24}>
          <AntTable
            data={Object.values(selectedProducts)}
            columns={getTableColumns({
              updateProductRow,
              removeProductRow,
            })}
            summary={pageData => Summary({ pageData })}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Products;

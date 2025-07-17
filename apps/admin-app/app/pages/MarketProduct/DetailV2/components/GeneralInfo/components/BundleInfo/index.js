import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Row } from 'antd';
import { get, sortBy } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { arrayMove } from '@dnd-kit/sortable';

import AddOrEditBundleProductModalForm from './AddOrEditBundleProductModalForm';
import RedirectWarehouseModal from './RedirectWarehouseModal';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getTableColumns } from './config';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { FORM_MODE } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Space, EditSaveCancelButtons, Button, TableDraggable } from '@shared/components/GUI';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';

const BundleInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const existingBundleProducts = useMemo(
    () => (marketProduct.bundleProducts ?? []).map(({ sort, count, product }) => ({
      sort,
      count,
      product,
      // Added productId to the top level because "TableWithDraggableRows" in "BundleInfo"
      // needs an identifier for each row for drag and sort to work properly.
      productId: product._id,
    })),
    [marketProduct.bundleProducts],
  );
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.BUNDLE_INFO.containerId });

  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const isPending = isGetPending || isUpdatePending;
  const { t } = useTranslation('marketProductPageV2');
  const [isBundleProductModalVisible, setIsBundleProductModalVisible] = useState(false);
  const [bundleProducts, setBundleProducts] = useState([...existingBundleProducts]);
  const [bundleProductModalParams, setBundleProductModalParams] = useState({ mode: FORM_MODE.ADD });
  const [isTableEditable, setIsTableEditable] = useState(false);

  const handleSave = () => {
    const totalCount = bundleProducts.reduce((acc, { count = 0 }) => acc + count, 0);
    if (totalCount < 2) {
      return dispatch(ToastCreators.error({ message: t('BUNDLE_INFO.ERROR.ADD_2_OR_MORE_ITEMS') }));
    }

    let newBundleProducts = bundleProducts.map(bundleProduct => {
      return {
        ...bundleProduct,
        // This property was added to bundleProducts specifically for TableWithDraggableRows.
        // It doesn't belong in the model, so we undo it before submitting the data
        productId: undefined,
        product: bundleProduct?.product?._id,
      };
    });

    newBundleProducts = sortBy(newBundleProducts, 'sort');

    newBundleProducts = newBundleProducts.map((product, index) => {
      const newProduct = {
        ...product,
        sort: index + 1,
      };
      return newProduct;
    });

    const body = { bundleProducts: newBundleProducts };
    return dispatch(Creators.updateMarketProductRequest({ id: marketProduct._id, body }));
  };

  const handleEdit = useCallback(() => {
    setIsTableEditable(true);
  }, []);

  const handleCancel = () => {
    setIsTableEditable(false);
    setBundleProducts(existingBundleProducts);
  };

  const openBundleProductModal = params => {
    return () => {
      setIsBundleProductModalVisible(true);
      setBundleProductModalParams(params);
    };
  };

  const closeBundleProductModal = () => {
    setIsBundleProductModalVisible(false);
  };

  useEffect(() => {
    setBundleProducts(existingBundleProducts);
    setIsTableEditable(false);
  }, [existingBundleProducts]);

  const handleEditClick = useCallback(record => {
    return openBundleProductModal({ mode: FORM_MODE.EDIT, currentBundleProduct: record })();
  }, []);

  const handleRemoveClick = useCallback(record => {
    let newBundleProducts = bundleProducts.filter(bundleProduct => {
      const bundleProductId = get(bundleProduct, 'product._id');
      const recordProductId = get(record, 'product._id');
      return bundleProductId !== recordProductId;
    });

    newBundleProducts = newBundleProducts.map((product, index) => {
      const newProduct = {
        ...product,
        sort: index + 1,
      };
      return newProduct;
    });

    setBundleProducts(newBundleProducts);
  }, [bundleProducts]);

  const columns = useMemo(() => getTableColumns(handleEditClick, handleRemoveClick, isTableEditable), [
    handleEditClick, handleRemoveClick, isTableEditable,
  ]);

  const onDragEnd = useCallback(({ active, over }) => {
    setBundleProducts(prevItems => {
      const activeIndex = prevItems.findIndex(i => i.productId === active.id);
      const overIndex = prevItems.findIndex(i => i.productId === over?.id);
      return arrayMove(prevItems, activeIndex, overIndex)
        .map((product, index) => ({
          ...product,
          sort: index + 1,
        }));
    });
  }, []);

  return (
    <Space
      dataTestId="bundle-info-space"
      title={t('BUNDLE_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <RedirectWarehouseModal bundleProducts={bundleProducts} existingBundleProducts={existingBundleProducts} />
      <Form>
        <TableDraggable
          columns={columns}
          data={bundleProducts}
          isSortingColumnHidden={!isTableEditable}
          rowKey="productId"
          onDragEnd={onDragEnd}
        />
        <AddOrEditBundleProductModalForm
          params={bundleProductModalParams}
          visible={isBundleProductModalVisible}
          onCancel={closeBundleProductModal}
          onSetBundleProducts={newBundleProducts => setBundleProducts(newBundleProducts)}
          bundleProducts={bundleProducts}
        />
        <Row className="flex-row-reverse">
          <EditSaveCancelButtons
            disabled={!isTableEditable}
            htmlType="submit"
            isFormEditable={isTableEditable}
            loading={isPending}
            onCancelClick={handleCancel}
            onEditClick={handleEdit}
            onSaveClick={handleSave}
          />
          {isTableEditable && (
            <Button
              className="align-self-end mr-2"
              size="small"
              color="secondary"
              onClick={openBundleProductModal({ mode: FORM_MODE.ADD })}
              disabled={marketProduct?.isFresh && bundleProducts.length > 0}
              icon={<PlusOutlined />}
            >
              {t('BUNDLE_INFO.ADD_PRODUCT')}
            </Button>
          )}
        </Row>
      </Form>

    </Space>
  );
};

export default BundleInfo;

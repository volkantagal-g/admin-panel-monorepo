import { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Tooltip, Form, Modal } from 'antd';
import { useTheme } from 'react-jss';
import { cloneDeep, set, isEmpty, omit } from 'lodash';
import { readString } from 'react-papaparse';

import { Creators } from '../../redux/actions';
import { getMarketProductGroupSelector, getProductsOfProductGroupSelector, updateMarketProductGroupSelector } from '../../redux/selectors';
import { createNewCSVFileWithGroupIdColumn, getTableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import AddProductsModal from './AddProductsModal';
import { usePrevious } from '@shared/hooks';
import { getDiffObj, getBase64, getFileText } from '@shared/utils/common';
import FileUploader from '@shared/components/UI/FileUploader';
import { MIME_TYPE } from '@shared/shared/constants';
import { findDuplicates } from '@app/pages/MarketProduct/Group/utils';

const ProductsOfProductGroupTable = () => {
  const dispatch = useDispatch();
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const data = useSelector(getProductsOfProductGroupSelector.getData);
  const isPending = useSelector(getProductsOfProductGroupSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductGroupSelector.getIsPending);
  const { t } = useTranslation('marketProductGroupPage');
  const theme = useTheme();
  const [formInstance] = Form.useForm();
  const [isTableEditable, setIsTableEditable] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const prevData = usePrevious(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, modalContext] = Modal.useModal();

  function handleDeleteClick() {
    if (!selectedRowKeys.length) return;

    const modalConfig = {
      content: (
        <>
          {t('global:DELETE_SELECTED_ROWS_CONFIRM_TEXT')}
        </>
      ),
      icon: null,
      okText: t('button:SAVE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        const newProducts = [...products];
        selectedRowKeys.forEach(_id => {
          const currentProduct = newProducts.find(product => product._id === _id);
          set(currentProduct, '_removed', true);
        });
        return setProducts(newProducts);
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  }

  const handleSave = () => {
    const originalData = cloneDeep(data);
    const changedProducts = products.map(item => omit(item, ['_errors', '_removed']));
    const { newValues: changedProductsObject } = getDiffObj(originalData, changedProducts);
    const productsToUpdate = Object.entries(changedProductsObject)
      .map(([key, value]) => {
        const product = products?.[key];
        return { ...product, ...value };
      })
      .filter(product => !product?._removed)
      .map(product => ({
        product: product?._id,
        order: Number(product?.order),
      }));

    const productsToRemove = products
      .filter(product => product?._removed)
      .map(product => ({ product: product?._id }));

    const body = {
      ...(productsToUpdate?.length ? { productsToUpdate } : undefined),
      ...(productsToRemove?.length ? { productsToRemove } : undefined),
    };

    dispatch(Creators.updateMarketProductGroupRequest({
      id: marketProductGroup?._id,
      body,
    }));
  };

  const handleEdit = () => {
    setIsTableEditable(true);
  };

  const handleCancel = () => {
    setIsTableEditable(false);
    setProducts(cloneDeep(data));
  };

  useEffect(() => {
    if (marketProductGroup?._id) {
      dispatch(Creators.getProductsOfProductGroupRequest({ id: marketProductGroup?._id }));
    }
  }, [dispatch, marketProductGroup]);

  useEffect(() => {
    if (prevData !== data) {
      setProducts(cloneDeep(data));
    }
  }, [data, prevData]);

  const handleInputChange = (_id, value, errors) => {
    const newProducts = [...products];
    const currentProduct = newProducts.find(product => product._id === _id);
    set(currentProduct, 'order', value);
    set(currentProduct, '_errors', errors);
    return setProducts(newProducts);
  };

  const handleModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const canBeSubmittable = useMemo(
    () => products
      ?.filter(product => !product._removed)
      ?.every(product => isEmpty(product._errors)),
    [products],
  );

  const handleImportProductsOfProductGroup = async (loadedBase64File, file) => {
    try {
      const newFile = await createNewCSVFileWithGroupIdColumn(file.originFileObj, marketProductGroup._id);
      getBase64(newFile, base64 => dispatch(Creators.importProductsOfProductGroupRequest({ loadedFile: base64 })));
    }
    catch (e) {
      const modalConfig = {
        content: e.message,
        icon: null,
        centered: true,
        okCancel: false,
      };
      modal.confirm(modalConfig);
    }
  };

  const handleUniqProductIds = async file => {
    return new Promise(resolve => {
      getFileText(file, csvText => {
        const json = readString(csvText, { header: true }).data;
        const duplicates = findDuplicates(json);
        if (duplicates.length > 0) {
          resolve(t('DUPLICATE_PRODUCT_IDS'));
        }
        resolve();
      });
    });
  };

  const filteredProducts = products?.filter(product => !product._removed);

  const handleCheckboxClick = product => {
    const selectedIdSet = new Set(selectedRowKeys);
    const id = product._id;

    if (selectedIdSet.has(id)) {
      selectedIdSet.delete(id);
    }
    else {
      selectedIdSet.add(id);
    }

    setSelectedRowKeys(Array.from(selectedIdSet));
  };

  const handleSelectAllClick = () => {
    setSelectedRowKeys(
      selectedRowKeys.length ? [] : filteredProducts.map(p => p._id),
    );
  };

  const tableFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      <Col key="4">
        <Button size="small" disabled={isTableEditable}>
          <FileUploader
            okText={t('global:IMPORT')}
            supportedFileTypes={[MIME_TYPE.CSV]}
            modalTitle={t('IMPORT_PRODUCTS')}
            buttonText={t('IMPORT_PRODUCTS')}
            onOkayClick={handleImportProductsOfProductGroup}
            customValidate={handleUniqProductIds}
            warningText={t('PRODUCTS_OF_PRODUCT_GROUP_IMPORT_RULES')}
          />
        </Button>

      </Col>
      <Col key="1">
        <Button size="small" onClick={() => setIsAddModalVisible(true)} disabled={isTableEditable}>
          {t('ADD_NEW_PRODUCTS')}
        </Button>
      </Col>
      {isTableEditable ? (
        <Fragment key="2">
          <Col>
            <Button size="small" onClick={handleCancel}>
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button size="small" type="primary" onClick={handleSave} loading={isUpdatePending} disabled={!canBeSubmittable}>
              {t('button:SAVE')}
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col key="3">
          <Tooltip title={products?.length < 1 ? t('THERE_IS_NO_PRODUCT_TO_EDIT') : ''} placement="bottomLeft">
            <Button size="small" onClick={handleEdit} disabled={products?.length < 1}>
              {t('button:EDIT')}
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  );

  return (
    <>
      <AntTableV2
        rowSelection={isTableEditable && {
          selectedRowKeys,
          onSelectAll: handleSelectAllClick,
          onSelect: handleCheckboxClick,
        }}
        title={t('PRODUCTS_OF_PRODUCT_GROUP')}
        rightElement={isTableEditable && (
          <>
            <Button size="small" disabled={!isTableEditable} className="mr-2" onClick={handleSelectAllClick}>
              {t('button:SELECT_ALL')}
            </Button>
            <Button size="small" disabled={!isTableEditable} onClick={handleDeleteClick}>
              {t('button:DELETE_SELECTED_ROWS', ({ count: selectedRowKeys.length }))}
            </Button>
          </>
        )}
        data={filteredProducts}
        columns={getTableColumns({
          isTableEditable,
          onInputChange: handleInputChange,
          formInstance,
        })}
        loading={isPending}
        footer={tableFooter}
      />
      <AddProductsModal
        visible={isAddModalVisible}
        onCancel={handleModalCancel}
        productsOfProductGroup={products}
      />
      {modalContext}
    </>
  );
};

export default ProductsOfProductGroupTable;

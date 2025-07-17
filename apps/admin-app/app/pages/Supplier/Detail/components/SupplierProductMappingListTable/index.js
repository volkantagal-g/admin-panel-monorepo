import { useState, useEffect } from 'react';
import _get from 'lodash/get';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Table, Modal } from 'antd';
import { useTheme } from 'react-jss';

import { Creators } from '../../redux/actions';
import {
  getSupplierProductMappingsSelector,
  mapSupplierProductsSelector,
  mapSupplierWarehousesSelector,
} from '../../redux/selectors';
import { tableColumns } from './config';
import AntCard from '@shared/components/UI/AntCard';

const SupplierProductMappingListTable = () => {
  const dispatch = useDispatch();
  const [modal, confirmationModal] = Modal.useModal();
  const theme = useTheme();
  const data = useSelector(getSupplierProductMappingsSelector.getData) || [];
  const isPending = useSelector(
    getSupplierProductMappingsSelector.getIsPending,
  );
  const { t } = useTranslation('supplierPage');
  const { id: supplierId } = useParams();
  const [editableRow, setEditableRow] = useState(false);
  const [barCode, setBarCode] = useState('');
  const [supplierCode, setSupplierCode] = useState('');

  const isMapSupplierProductsPending = useSelector(
    mapSupplierProductsSelector.getIsPending,
  );
  const isMapSupplierWarehousesPending = useSelector(
    mapSupplierWarehousesSelector.getIsPending,
  );

  useEffect(() => {
    dispatch(Creators.getSupplierProductMappingsRequest({ id: supplierId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

  const setOnChange = callback => {
    return event => {
      const value = _get(event, 'target.value', '');
      callback(value);
    };
  };

  const handleMapProductsButtonClick = () => {
    const config = {
      title: t('MATCH_PRODUCTS_CONFIRM_MODAL.TITLE'),
      content: <>{t('MATCH_PRODUCTS_CONFIRM_MODAL.MESSAGE')}</>,
      icon: null,
      onOk: () => {
        dispatch(Creators.mapSupplierProductsRequest({ id: supplierId }));
      },
      centered: true,
    };
    modal.confirm(config);
  };

  const handleMapWarehousesButtonClick = () => {
    const config = {
      title: t('MATCH_WAREHOUSES_CONFIRM_MODAL.TITLE'),
      content: <>{t('MATCH_WAREHOUSES_CONFIRM_MODAL.MESSAGE')}</>,
      icon: null,
      onOk: () => {
        dispatch(Creators.mapSupplierWarehousesRequest());
      },
      centered: true,
    };
    modal.confirm(config);
  };

  const onSubmit = submitValues => {
    dispatch(
      Creators.updateSupplierProductMappingBarcodeAndCodeRequest({
        id: submitValues._id,
        updateData: {
          productEanBarcode: barCode,
          productSupplierCode: supplierCode,
        },
      }),
    );

    setBarCode('');
    setSupplierCode('');
  };

  const rowEditProps = {
    editableRow,
    setEditableRow,
    barCode,
    setBarCode,
    supplierCode,
    setSupplierCode,
    setOnChange,
    onSubmit,
  };

  const tableTitle = () => (
    <Row className="w-100">
      <Col span={12}>{t('SUPPLIER_PRODUCT_MAPPINGS')}</Col>
      <Col span={12} className="text-right">
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <Button
              size="small"
              type="primary"
              onClick={handleMapProductsButtonClick}
              loading={isMapSupplierProductsPending}
            >
              {t('MATCH_PRODUCTS')}
            </Button>
          </Col>
          <Col>
            <Button
              size="small"
              type="primary"
              onClick={handleMapWarehousesButtonClick}
              loading={isMapSupplierWarehousesPending}
            >
              {t('MATCH_WAREHOUSES')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <>
      <AntCard title={tableTitle()}>
        <Table
          dataSource={data || []}
          columns={tableColumns(rowEditProps)}
          loading={isPending}
          size="small"
        />
      </AntCard>
      {confirmationModal}
    </>
  );
};

export default SupplierProductMappingListTable;

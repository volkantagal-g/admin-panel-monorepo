import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Table } from '@shared/components/GUI';
import CsvImporter from '@shared/components/UI/CsvImporter';

import { tableColumns } from '@app/pages/Planogram/Products/components/PlanogramProductsListTable/config';
import { Creators } from '@app/pages/Planogram/Products/redux/actions';
import {
  getDemographiesSelector,
  getPlanogramProductListSelector,
  getSizesSelector,
} from '@app/pages/Planogram/Products/redux/selectors';
import { MIME_TYPE } from '@shared/shared/constants';

import useStyles from '@app/pages/Planogram/Products/components/PlanogramProductsListTable/styles';

export const exampleCsv = {
  productId: 'xxxxxxxxxxxxxxx',
  demographies: '[Premium, Upper Premium]',
  sizes: '[Mini, Maxi]',
  domains: '[G10, G30]',
  warehouseTypes: '[RegularWarehouse]',
};

const PlanogramProductsListTable = React.memo(({ formValues }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('planogramPage');

  const initialPagination = useMemo(() => ({ page: 1, pageSize: 10 }), []);

  const isEmptyValue = item => isEmpty(item) || item === undefined || item === null || item?.length === 0;

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const planogramData = useSelector(
    getPlanogramProductListSelector.getData,
    shallowEqual,
  );

  const [currentPagination, setCurrentPagination] = useState(initialPagination);
  const [planogramProduct, setPlanogramProduct] = useState([]);
  const [
    isOpenServicePricesCsvImportModal,
    setIsOpenServicePricesCsvImportModal,
  ] = useState(false);

  const useProductTableList = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(
      getDemographiesSelector.getIsPending,
    );
    const productListIsPending = useSelector(
      getPlanogramProductListSelector.getIsPending,
    );
    return {
      isPending:
        sizeListIsPending || demographyListIsPending || productListIsPending,
    };
  };
  const { isPending } = useProductTableList();

  const openServicePricesCsvImportModal = () => {
    setIsOpenServicePricesCsvImportModal(true);
  };

  const handlePaginationChange = (page, pageSize) => {
    let body = { page, pageSize, filter: {} };
    Object.entries(formValues).map(([key, value]) => {
      if (!isEmptyValue(value)) {
        body = { ...body, filter: { ...body.filter, [key]: value } };
      }
      return body;
    });
    dispatch(Creators.getPlanogramProductListRequest({ body }));
    setCurrentPagination({ page, pageSize });
  };

  const handleImport = (csvData, loadedFile, loadedBase64File) => {
    dispatch(
      Creators.importPlanogramProductsRequest({ loadedFile: loadedBase64File }),
    );
  };
  const handleExport = () => {
    dispatch(Creators.exportPlanogramProductRequest());
  };

  useEffect(() => {
    if (!isPending) {
      setPlanogramProduct(planogramData?.data?.items);
    }
  }, [isPending, planogramData]);

  const settingsMenu = (
    <Menu>
      <Menu.Item key="1" onClick={openServicePricesCsvImportModal}>
        <CsvImporter
          modalProps={{ width: 800 }}
          onOkayClick={handleImport}
          exampleCsv={exampleCsv}
          hasNestedHeaderKeys
          importButtonText={t('IMPORT_FILE')}
          isVisible={isOpenServicePricesCsvImportModal}
          accept={MIME_TYPE.XLSX}
        />
      </Menu.Item>
      <Menu.Item key="2" onClick={handleExport}>
        {t('EXPORT_FILE')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Table
      data-testid="planogram-products-table"
      columns={tableColumns(sizeList, demographyList, classes)}
      title={t('PRODUCTS')}
      headerControls={(
        <Col>
          <Dropdown key="3" overlay={settingsMenu}>
            <MoreOutlined className={classes.menu} />
          </Dropdown>
        </Col>
      )}
      data={planogramProduct || []}
      loading={isPending}
      scroll={{ x: 750 }}
      isBEPaginationAvailable
      currentPage={currentPagination.page}
      currentPageSize={currentPagination.pageSize}
      total={planogramData?.total}
      onPaginationChange={handlePaginationChange}
    />
  );
});

export default PlanogramProductsListTable;

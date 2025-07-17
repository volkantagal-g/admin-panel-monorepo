import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Table } from '@shared/components/GUI';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { tableColumns } from '@app/pages/Planogram/Warehouses/components/PlanogramWarehousesListTable/config';

import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import {
  getDemographiesSelector,
  getSizesSelector,
  listPlanogramWarehousesSelector,
} from '@app/pages/Planogram/Warehouses/redux/selectors';
import { MIME_TYPE } from '@shared/shared/constants';

import useStyles from '@app/pages/Planogram/Warehouses/components/PlanogramWarehousesListTable/styles';

export const exampleCsv = {
  warehouseId: 'xxxxxxxxxx',
  demography: 'Premium',
  size: 'Maxi',
};
const isEmptyValue = item => isEmpty(item) || item === undefined || item === null || item?.length === 0;

const PlanogramWarehousesListTable = React.memo(
  ({ formValues, initialPagination }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation('planogramPage');

    const data = useSelector(
      listPlanogramWarehousesSelector.getData,
      shallowEqual,
    );
    const sizeList = useSelector(getSizesSelector.getData);
    const demographyList = useSelector(getDemographiesSelector.getData);

    const [currentPagination, setCurrentPagination] =
      useState(initialPagination);
    const [
      isOpenServicePricesCsvImportModal,
      setIsOpenServicePricesCsvImportModal,
    ] = useState(false);

    const useProductTableList = () => {
      const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
      const demographyListIsPending = useSelector(
        getDemographiesSelector.getIsPending,
      );
      const warehouseTableListIsPending = useSelector(
        listPlanogramWarehousesSelector.getIsPending,
      );
      return {
        isPending:
          sizeListIsPending ||
          demographyListIsPending ||
          warehouseTableListIsPending,
      };
    };
    const { isPending } = useProductTableList();

    const openServicePricesCsvImportModal = () => {
      setIsOpenServicePricesCsvImportModal(true);
    };

    const handlePaginationChange = (page, pageSize) => {
      let modifiedParams = { pagination: { page, pageSize } };

      Object.entries(formValues)?.map(element => {
        if (!isEmptyValue(element[1])) {
          modifiedParams = {
            ...modifiedParams,
            filter: { ...modifiedParams.filter, [element[0]]: element[1] },
          };
        }
        return modifiedParams;
      });
      dispatch(
        Creators.listPlanogramWarehousesRequest({ body: modifiedParams }),
      );
      setCurrentPagination({ page, pageSize });
    };

    const handleExportPlanogramWarehouses = () => {
      dispatch(Creators.exportPlanogramWarehouseRequest());
    };

    const handleImport = (csvData, loadedFile, loadedBase64File) => {
      dispatch(
        Creators.importPlanogramWarehousesRequest({ loadedFile: loadedBase64File }),
      );
    };

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
        <Menu.Item key="2" onClick={handleExportPlanogramWarehouses}>
          {t('EXPORT_FILE')}
        </Menu.Item>
      </Menu>
    );

    return (
      <Table
        data-testid="warehouses-list-table"
        columns={tableColumns(demographyList, sizeList, classes)}
        title={t('WAREHOUSES')}
        data={data?.items || []}
        headerControls={(
          <Col>
            <Dropdown key="3" overlay={settingsMenu}>
              <MoreOutlined className={classes.menu} />
            </Dropdown>
          </Col>
        )}
        currentPage={currentPagination.page}
        currentPageSize={currentPagination.pageSize}
        onPaginationChange={handlePaginationChange}
        loading={isPending}
        total={data?.total}
        scroll={{ x: 750 }}
        isBEPaginationAvailable
      />
    );
  },
);

export default PlanogramWarehousesListTable;

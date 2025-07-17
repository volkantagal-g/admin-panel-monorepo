import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { Table } from '@shared/components/GUI';
import { tableColumns } from '@app/pages/Planogram/Products/Detail/components/PlanogramsTable/config';
import {
  getPlanogramProductDetailsSelector,
  getSizesSelector,
  getDemographiesSelector,
  getWarehouseTypesSelector,
  updatePlanogramProductSelector,
} from '@app/pages/Planogram/Products/redux/selectors';

const PlanogramsTable = () => {
  const { t } = useTranslation('planogramPage');

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const warehouseTypesList = useSelector(getWarehouseTypesSelector.getData);
  const assignedWarehouses = useSelector(getPlanogramProductDetailsSelector.getAssignedWarehousesData);

  const updatePlanogramPending = useSelector(updatePlanogramProductSelector.getIsPending);

  const useProductDetails = () => {
    const assignedWarehousesPending = useSelector(getPlanogramProductDetailsSelector.getIsPending);
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const warehouseTypesListIsPending = useSelector(getWarehouseTypesSelector.getIsPending);
    return {
      isPending:
        assignedWarehousesPending ||
        sizeListIsPending ||
        demographyListIsPending ||
        warehouseTypesListIsPending,
    };
  };
  const { isPending } = useProductDetails();

  return (
    <Table
      data-testid="planograms-table"
      columns={tableColumns(sizeList, demographyList, warehouseTypesList)}
      title={t('WAREHOUSES')}
      data={assignedWarehouses || []}
      loading={isPending || updatePlanogramPending}
      scroll={{ x: 750 }}
      isBEPaginationAvailable
      total={assignedWarehouses?.length}
    />
  );
};

export default PlanogramsTable;

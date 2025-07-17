import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';

import { Table } from '@shared/components/GUI';
import { tableColumns } from '@app/pages/Planogram/Warehouses/Detail/components/PlanogramsTable/config';
import {
  getDemographiesSelector,
  getPlanogramWarehouseDetailsSelector,
  getSizesSelector,
} from '@app/pages/Planogram/Warehouses/redux/selectors';

const PlanogramsTable = () => {
  const { t } = useTranslation('planogramPage');

  const planogramWarehouseProductTable = useSelector(getPlanogramWarehouseDetailsSelector.getProductData, shallowEqual);
  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);

  const useWarehouseDetails = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const warehouseDetailTableIsPending = useSelector(getPlanogramWarehouseDetailsSelector.getIsPending);
    return { isPending: sizeListIsPending || demographyListIsPending || warehouseDetailTableIsPending };
  };
  const { isPending } = useWarehouseDetails();

  return (
    <Table
      data-testid="warehouse-planograms-table"
      columns={tableColumns(demographyList, sizeList)}
      data={planogramWarehouseProductTable?.items}
      title={t('PRODUCTS')}
      isBEPaginationAvailable
      total={planogramWarehouseProductTable?.total}
      loading={isPending}
    />
  );
};
export default PlanogramsTable;

import AntTable from '@shared/components/UI/AntTable';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getTableColumns } from './config';

const Table = ({ isPending, data }) => {
  const { canAccess } = usePermission();

  const hasFranchiseEquipmentDetailPermission = canAccess(permKey.PAGE_FRANCHISE_EQUIPMENT_DETAIL);
  const tableColumns = getTableColumns({ hasFranchiseEquipmentDetailPermission });

  return (
    <>
      <AntTable
        data={data}
        columns={tableColumns}
        loading={isPending}
        rowKey="_id" />
    </>
  );
};

export default Table;

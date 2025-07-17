import AntTable from '@shared/components/UI/AntTable';
import { _getTableColumns } from './config';

const Table = ({ data, total, isPending, pagination, handlePaginationChange }) => {
  const tableColumns = _getTableColumns();

  return (
    <>
      <AntTable
        data={data}
        total={total}
        loading={isPending}
        columns={tableColumns}
        rowKey="_id"
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default Table;
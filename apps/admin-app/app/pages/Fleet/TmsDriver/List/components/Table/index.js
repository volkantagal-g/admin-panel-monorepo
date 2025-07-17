import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';

const TmsDriversTable = ({ pagination, handlePagination, data, isPending, columns, totalCount }) => {
  return (
    <AntCard>
      <AntTableV2
        data={data}
        columns={columns}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePagination}
        total={totalCount}
      />
    </AntCard>
  );
};

export default TmsDriversTable;

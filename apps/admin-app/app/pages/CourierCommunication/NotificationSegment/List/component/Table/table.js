import AntTableV2 from '@shared/components/UI/AntTableV2';

const Table = ({ data, isPending, handlePaginationChange, pagination, columns }) => {
  return (
    <AntTableV2
      data={data}
      columns={columns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default Table;

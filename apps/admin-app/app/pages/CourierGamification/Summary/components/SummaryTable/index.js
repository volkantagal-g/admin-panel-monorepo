import { Col, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

const SummaryTable = ({ isPending, data, tableName, handlePaginationChange, pagination, setSortParams }) => {
  const onChange = (page, filters, sorter) => {
    setSortParams({
      sortKey: sorter?.columnKey,
      sortDirection: sorter?.order,
    });
  };

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={tableName}
          data={data}
          columns={getTableColumns()}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          showSorterTooltip
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default SummaryTable;

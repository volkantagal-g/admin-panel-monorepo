import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Card } from 'antd';

import Table from './table';
import { tableColumns } from './config';
import permKey from '@shared/shared/permKey.json';
import { segmentList } from '../../redux/selector';

import { usePermission } from '@shared/hooks';

const SegmentTable = ({ pagination, handlePagination }) => {
  const { t } = useTranslation(['courierSegment', 'global']);
  const { canAccess } = usePermission();

  const segmentListData = useSelector(segmentList?.getSegmentListData);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    handlePagination({ currentPage, rowsPerPage });
  };

  return (
    <Card>
      {canAccess(permKey.PAGE_COURIER_NOTIFICATION_SEGMENT_LIST) && (
        <Table
          data={segmentListData?.segments}
          columns={tableColumns({ t })}
          pagination={pagination}
          handlePaginationChange={handlePaginationChange}
        />
      )}
    </Card>
  );
};

export default SegmentTable;

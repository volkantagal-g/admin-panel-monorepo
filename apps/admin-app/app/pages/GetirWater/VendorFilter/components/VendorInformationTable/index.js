import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import useTableTranslation from '@app/pages/GetirWater/VendorFilter/hooks/useTableTranslation';
import generateTableColumns from './generateTableColumns';
import {
  filtersSelector,
  isExcelPendingSelector,
  isVendorsPendingSelector,
  statusesSelector,
  vendorsSelector,
} from '@app/pages/GetirWater/VendorFilter/redux/selectors';
import { Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import useExcel from '@app/pages/GetirWater/VendorFilter/hooks/useExcel';

const VendorInformationTable = () => {
  const dispatch = useDispatch();
  const t = useTableTranslation('VENDOR_INFORMATION_TABLE');
  const statusList = useSelector(statusesSelector);
  const columns = generateTableColumns(t, statusList);
  const { count, page, ...otherFilters } = useSelector(filtersSelector);
  const vendors = useSelector(vendorsSelector);
  const isVendorsPending = useSelector(isVendorsPendingSelector);
  const isExcelPending = useSelector(isExcelPendingSelector);
  const exportExcelFile = useExcel({ dispatch, columns, otherFilters, statusList });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    const paginationFilters = { page: currentPage - 1, count: rowsPerPage };
    dispatch(Creators.setFilters({ filters: paginationFilters }));
    dispatch(Creators.filterVendorsRequest({ data: { ...otherFilters, ...paginationFilters } }));
  };

  const pagination = { currentPage: page + 1, rowsPerPage: count };

  return (
    <AntTableV2
      rowKey="vendorId"
      title={t('TITLE')}
      data={vendors}
      columns={columns}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      loading={isVendorsPending}
      rightElement={(
        <Button
          onClick={exportExcelFile}
          type="secondary"
          icon={<CloudDownloadOutlined />}
          disabled={isExcelPending}
        >
          {t('global:EXPORT_EXCEL')}
        </Button>
      )}
    />
  );
};

export default VendorInformationTable;

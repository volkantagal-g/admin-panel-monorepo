import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

import { getLimitAndOffset } from '@shared/utils/common';
// Components
import AntTableV2 from '@shared/components/UI/AntTableV2';

// Redux
import { Creators } from '../../redux/actions';
import { filtersSelector, logsSelector } from '../../redux/selectors';

import { getTableColumns } from './config';
import useParentStyle from '../../styles';

export default function LogTable() {
  const parentClasses = useParentStyle();
  const dispatch = useDispatch();
  const { t } = useTranslation(['employeeLogsPage', 'global']);

  const filters = useSelector(filtersSelector.getFilters);
  const pagination = useSelector(filtersSelector.getPagination);
  const logs = useSelector(logsSelector.getLogs);
  const isLoading = useSelector(logsSelector.getIsPending);
  const isExportLoading = useSelector(logsSelector.getIsExportPending);

  return (
    <Card
      className={[
        parentClasses.cardContainer,
        parentClasses.tableCardContainer,
      ].join(' ')}
    >
      <AntTableV2
        data={logs}
        columns={getTableColumns()}
        pagination={pagination}
        total={9999}
        onPaginationChange={handlePaginationChange}
        loading={isLoading || isExportLoading}
        onExport={handleOnExport}
      />
    </Card>
  );

  function handlePaginationChange(paginationData: any) {
    dispatch(Creators.setPagination({ paginationData }));
    dispatch(Creators.filterEmployeeLogsRequest({
      filters: {
        ...filters,
        ...getLimitAndOffset(paginationData),
      },
    }));
  }

  function handleOnExport() {
    dispatch(Creators.exportLogsRequest({ filters, t }));
  }
}

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import AntTable from '@shared/components/UI/AntTableV2';
import useStyles from './styles';
import { leaveTypesSelector } from '../../../redux/selectors';
import { getTableColumns } from './config';
import { getRowClassNames } from '../utils';

const TableContainer = ({ details, isLoading = false }) => {
  const classes = useStyles();
  const { t } = useTranslation('timesheetLogs');
  const leaveData = useSelector(leaveTypesSelector.getData);

  const leaveTranslations = useMemo(() => (leaveData || []).reduce((acc, { code, name }) => ({
    ...acc,
    [code]: name,
  }), {}), [leaveData]);

  return (
    <div className={classes.container}>
      <AntTable
        total={2}
        data={[details.oldData, details.newData] || []}
        loading={isLoading}
        rowKey={obj => obj._id}
        className={classes.table}
        rowClassName={row => getRowClassNames(row, classes)}
        columns={getTableColumns({
          classes,
          leaveTranslations,
          t,
        })}
      />
    </div>
  );
};

export default TableContainer;

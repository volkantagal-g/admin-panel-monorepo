import { useSelector } from 'react-redux';

// import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Table } from 'antd';

import { getTobbGibRequestSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { getFormattedTobbGibRequestData } from '../../utils';
import useStyles from './styles';

const DataTable = () => {
  const classes = useStyles();
  const data = useSelector(getTobbGibRequestSelector.getData);
  const isPending = useSelector(getTobbGibRequestSelector.getIsPending);

  return (
    <Table
      bordered
      dataSource={getFormattedTobbGibRequestData(data)}
      columns={getTableColumns({ classes })}
      loading={isPending}
      data-testid="tob-gib-request-table"
      style={{ whiteSpaceCollapse: 'preserve' }}
      pagination
      containerClassName="w-100"
      scroll={{ x: 1000, y: 520 }}
    />
  );
};

export default DataTable;

import useStyles from './styles';
import AntTable from '@shared/components/UI/AntTable';
import { columns, getFormattedWarehouseInfo } from './config';

export default function WarehouseInfoTable({ warehouse }) {
  const classes = useStyles();
  const formatted = getFormattedWarehouseInfo(warehouse);
  return <AntTable data={formatted} columns={columns} showHeader={false} className={classes.table} />;
}

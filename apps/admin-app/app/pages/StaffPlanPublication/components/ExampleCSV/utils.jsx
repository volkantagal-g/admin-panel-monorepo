import AntTable from '@shared/components/UI/AntTable';
import { COURIER_PLAN_TYPE_KEYS } from '../../constants';

export const getFormattedCSVTable = _exampleCSV => {
  const colNames = Object.keys(_exampleCSV[0]);
  const columns = colNames.map(name => {
    return {
      title: name,
      dataIndex: name,
      key: name,
    };
  });

  return <AntTable dataSource={_exampleCSV} columns={columns} scroll={{ x: 520 }} showFooter={false} />;
};

export const courierExampleCSV = {
  [COURIER_PLAN_TYPE_KEYS.STANDARD]: [{
    warehouse_id: '5a33e1540fdedc000401cf0d',
    day: '2021-08-22',
    hour: 15,
    courier_type: 2,
    courier_plan: 1,
    'forecast (optional)': 1,
    'ttp_forecast (optional)': 1,
  }],
  [COURIER_PLAN_TYPE_KEYS.SCHEDULED]: [{
    warehouse_id: '5a33e1540fdedc000401cf0d',
    day: '2021-08-22',
    hour: 15,
    courier_type: 2,
    courier_plan: 1,
    'forecast (optional)': 1,
    'ttp_forecast (optional)': 1,
  }],
  [COURIER_PLAN_TYPE_KEYS.SLOT_CAPACITY]: [{
    warehouse_id: '5a33e1540fdedc000401cf0d',
    day: '2021-08-22',
    hour: 15,
    domain_type: 2,
    slot_capacity_count: 1,
  }],
};

export const storeAssistantExampleCSV = [
  {
    warehouse_id: '5a33e1540fdedc000401cf0d',
    day: '2021-08-22',
    hour: 15,
    sa_plan: 1,
  },
];

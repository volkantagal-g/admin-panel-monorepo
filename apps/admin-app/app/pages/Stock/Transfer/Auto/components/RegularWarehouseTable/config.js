import { Checkbox } from 'antd';

import AntInputNumber from '@shared/components/UI/AntInputNumber';

const traPrefix = 'stockTransferAuto:';

export const generateColumns = (t, warehouseList, setWarehouseList) => {
  const handleCheckboxChange = (e, record, fieldName) => {
    const updatedWarehouses = warehouseList.map(warehouse => {
      if (warehouse._id === record._id) {
        return {
          ...warehouse,
          [fieldName]: e.target.checked,
        };
      }

      return warehouse;
    });

    setWarehouseList(updatedWarehouses);
  };

  const handleInputNumberFieldChange = (value, record, fieldName) => {
    const updatedWarehouses = warehouseList.map(warehouse => {
      if (warehouse._id === record._id) {
        return {
          ...warehouse,
          [fieldName]: value,
        };
      }

      return warehouse;
    });

    setWarehouseList(updatedWarehouses);
  };

  const columns = [
    {
      title: t(`${traPrefix}REGULAR_WAREHOUSE`),
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
    },
    {
      title: t(`${traPrefix}CATEGORY_PARAM_ENABLED`),
      dataIndex: 'itemParamEnabled',
      key: 'itemParamEnabled',
      render: (_, record) => {
        return (
          <Checkbox
            checked={record?.itemParamEnabled}
            onChange={e => handleCheckboxChange(e, record, 'itemParamEnabled')}
          />
        );
      },
      align: 'center',
      width: 200,
    },
    {
      title: t(`${traPrefix}STOCK_DAY`),
      dataIndex: 'stockDay',
      key: 'stockDay',
      render: (_, record) => {
        return record.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.stockDay}
            onChange={e => handleInputNumberFieldChange(e, record, 'stockDay')}
          />
        ) : null;
      },
      width: 150,
      align: 'center',
    },
    {
      title: t(`${traPrefix}IGNORE_CURRENT_STOCK`),
      dataIndex: 'ignoreStock',
      key: 'ignoreStock',
      render: (_, record) => {
        return record.itemParamEnabled ? (
          <Checkbox defaultValue={record.ignoreStock} onChange={e => handleCheckboxChange(e, record, 'ignoreStock')} />
        ) : null;
      },
      align: 'center',
      width: 150,
    },
    {
      title: t(`${traPrefix}GROWTH_RATE`),
      dataIndex: 'growRate',
      key: 'growRate',
      render: (_, record) => {
        return record.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.growRate}
            onChange={e => handleInputNumberFieldChange(e, record, 'growRate')}
          />
        ) : null;
      },
      width: 150,
      align: 'center',
    },
  ];

  return columns;
};

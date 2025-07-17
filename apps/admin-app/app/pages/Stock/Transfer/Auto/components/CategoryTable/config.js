import { Checkbox } from 'antd';

import { getLangKey } from '@shared/i18n';
import AntInputNumber from '@shared/components/UI/AntInputNumber';

const traPrefix = 'stockTransferAuto:';

export const generateColumns = (t, wrappedCategories, setWrappedCategories) => {
  const handleCheckboxChange = (e, record, fieldName) => {
    const updatedCategories = wrappedCategories.map(wrappedCategory => {
      if (wrappedCategory._id === record._id) {
        return {
          ...wrappedCategory,
          [fieldName]: e.target.checked,
        };
      }

      return wrappedCategory;
    });

    setWrappedCategories(updatedCategories);
  };

  const handleInputNumberFieldChange = (value, record, fieldName) => {
    const updatedCategories = wrappedCategories.map(wrappedCategory => {
      if (wrappedCategory._id === record._id) {
        return {
          ...wrappedCategory,
          [fieldName]: value,
        };
      }

      return wrappedCategory;
    });

    setWrappedCategories(updatedCategories);
  };

  const columns = [
    {
      title: t(`${traPrefix}CATEGORY`),
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return name[getLangKey()];
      },
      width: 200,
      align: 'center',
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
      width: 150,
      align: 'center',
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
      width: 150,
      align: 'center',
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

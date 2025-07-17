import { Checkbox, DatePicker, Tooltip } from 'antd';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import AntInputNumber from '@shared/components/UI/AntInputNumber';

const traPrefix = 'stockOrderAuto:';

const { RangePicker } = DatePicker;

export const generateColumns = (t, wrappedProducts, setWrappedProducts) => {
  const handleCheckboxChange = (e, record, fieldName) => {
    const updatedProducts = wrappedProducts.map(wrappedProduct => {
      if (wrappedProduct._id === record._id) {
        return {
          ...wrappedProduct,
          [fieldName]: e.target.checked,
        };
      }

      return wrappedProduct;
    });

    setWrappedProducts(updatedProducts);
  };

  const handleInputNumberFieldChange = (value, record, fieldName) => {
    const updatedProducts = wrappedProducts.map(wrappedProduct => {
      if (wrappedProduct._id === record._id) {
        return {
          ...wrappedProduct,
          [fieldName]: value,
        };
      }

      return wrappedProduct;
    });

    setWrappedProducts(updatedProducts);
  };

  const handleDatePickerChange = (value, record, fieldName, isRange = false) => {
    const updatedProducts = wrappedProducts.map(wrappedProduct => {
      if (wrappedProduct._id === record._id) {
        return {
          ...wrappedProduct,
          [fieldName]: isRange ? {
            startDate: moment(value[0]).startOf('day').format(),
            endDate: moment(value[1]).endOf('day').format(),
          } : moment(value),
        };
      }

      return wrappedProduct;
    });

    setWrappedProducts(updatedProducts);
  };

  const columns = [
    {
      title: t(`${traPrefix}PRODUCT`),
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: { showTitle: false },
      render: fullName => (
        <Tooltip placement="topLeft" title={fullName[getLangKey()]}>
          {fullName[getLangKey()]}
        </Tooltip>
      ),
      width: 180,
    },
    {
      title: t(`${traPrefix}BARCODE`),
      dataIndex: 'barcodes',
      key: 'barcodes',
      render: (barcodes = []) => {
        return barcodes.join(',');
      },
      width: 150,
    },
    {
      title: t(`${traPrefix}PARAM_ENABLED`),
      dataIndex: 'itemParamEnabled',
      key: 'itemParamEnabled',
      render: (_, record) => {
        return (
          <Checkbox
            defaultChecked={record?.itemParamEnabled}
            data-testid="itemParamEnabled"
            onChange={e => handleCheckboxChange(e, record, 'itemParamEnabled')}
          />
        );
      },
      align: 'center',
      width: 50,
    },
    {
      title: t(`${traPrefix}DEMAND_RANGE`),
      dataIndex: 'demandRange',
      key: 'demandRange',
      width: 150,
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <RangePicker
            allowClear={false}
            defaultValue={[record.demandDates.startDate, record.demandDates.endDate]}
            onChange={e => handleDatePickerChange(e, record, 'demandDates', true)}
            data-testid="demandRange"
          />
        ) : null;
      },
      align: 'center',
      ellipsis: true,
    },
    {
      title: t(`${traPrefix}MAIN_STOCK_DAY`),
      dataIndex: 'mainStockDay',
      key: 'mainStockDay',
      width: 60,
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.mainStockDay}
            onChange={e => handleInputNumberFieldChange(e, record, 'mainStockDay')}
            data-testid="mainStockDay"
          />
        )
          : null;
      },
      ellipsis: true,
      align: 'center',
    },
    {
      title: t(`${traPrefix}MAIN_LEAD_DAY`),
      dataIndex: 'mainLeadDay',
      key: 'mainLeadDay',
      width: 60,
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.mainLeadDay}
            onChange={e => handleInputNumberFieldChange(e, record, 'mainLeadDay')}
          />
        ) : null;
      },
      ellipsis: true,
      align: 'center',
    },
    {
      title: t(`${traPrefix}STORE_STOCK_DAY`),
      dataIndex: 'storeStockDay',
      key: 'storeStockDay',
      width: 60,
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.storeStockDay}
            onChange={e => handleInputNumberFieldChange(e, record, 'storeStockDay')}
          />
        ) : null;
      },
      align: 'center',
      ellipsis: true,
    },
    {
      title: t(`${traPrefix}IGNORE_CURRENT_STOCK`),
      dataIndex: 'ignoreStock',
      key: 'ignoreStock',
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <Checkbox defaultValue={record.ignoreStock} onChange={e => handleCheckboxChange(e, record, 'ignoreStock')} />
        ) : null;
      },
      align: 'center',
      width: 50,
    },
    {
      title: t(`${traPrefix}PAST_PO_DAY`),
      dataIndex: 'stockOrderDay',
      key: 'stockOrderDay',
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <DatePicker
            allowClear={false}
            defaultValue={record.activeStockOrderDate}
            onChange={e => handleDatePickerChange(e, record, 'activeStockOrderDate')}
            data-testid="stockOrderDay"
          />
        ) : null;
      },
      width: 90,
      align: 'center',
    },
    {
      title: t(`${traPrefix}PAST_ST_DAY`),
      dataIndex: 'stockTransferDay',
      key: 'stockTransferDay',
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <DatePicker
            allowClear={false}
            defaultValue={record.activeStockTransferDate}
            onChange={e => handleDatePickerChange(e, record, 'activeStockTransferDate')}
          />
        ) : null;
      },
      width: 90,
      align: 'center',
    },
    {
      title: t(`${traPrefix}GROWTH_RATE`),
      dataIndex: 'demandMultiplier',
      key: 'demandMultiplier',
      render: (_, record) => {
        const element = wrappedProducts.find(wrappedProduct => wrappedProduct._id === record._id);
        return element.itemParamEnabled ? (
          <AntInputNumber
            className="w-100"
            defaultValue={record.growRate}
            onChange={e => handleInputNumberFieldChange(e, record, 'growRate')}
          />
        ) : null;
      },
      align: 'center',
      width: 90,
    },
  ];

  return columns;
};

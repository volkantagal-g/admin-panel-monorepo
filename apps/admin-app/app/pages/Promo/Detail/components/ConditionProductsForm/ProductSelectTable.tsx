import { Form, InputNumber, Select, Spin, Table } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingOutlined } from '@ant-design/icons';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { discountPriceNumberInputParser } from '@app/pages/Promo/Detail/components/BenefitTypeForm/formHelper';
import { productsFilterFn } from '@app/pages/Promo/Detail/components/ConditionProductsForm/formHelper';
import { getSupplierOptions } from '@app/pages/Promo/utils';

const EditableContext = React.createContext<FormInstance | null>(null);

const rateLimits = ['supplierSupport', 'thirdPartySupport'];

interface Item {
  id: string;
  fullName: string;
  picURL: string;
  saleLimit: number;
  discountedPrice?: number;
  supplierSupportReferenceId: string | null;
  thirdPartyReferenceId: string | null;
  isSold: boolean;
  supplierSupport: number | null;
  thirdPartySupport: number | null;
}

type Supplier = {
  _id: string,
  name: string;
}

type SelectedProduct = Partial<Item>;

type DataType = SelectedProduct & {
  key: React.Key;
  product: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  isCellEditable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  isFormEditable: Boolean;
  handleSave: (record: Item) => void;
  suppliers: Supplier[];
  isSupplierPending: Boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  isCellEditable,
  children,
  dataIndex,
  record,
  isFormEditable,
  handleSave,
  suppliers,
  isSupplierPending,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  // @ts-ignore
  const inputRef = useRef<InputNumber>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (isCellEditable && isFormEditable) {
      setEditing(!editing);
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      toggleEdit();
      return null;
    }
    catch {
      return null;
    }
  };
  let childNode = children;

  if (isCellEditable && isFormEditable) {
    let renderForm = (
      <InputNumber
        ref={inputRef}
        onPressEnter={save}
        onBlur={save}
        min={0}
      />
    );
    if (rateLimits.includes(dataIndex)) {
      renderForm = (
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          min={0}
          max={1}
        />
      );
    }
    else if (dataIndex === 'supplierSupportReferenceId' || dataIndex === 'thirdPartyReferenceId') {
      renderForm = (
        <Select
          allowClear
          className="w-100"
          options={getSupplierOptions(suppliers)}
          onChange={save}
          suffixIcon={isSupplierPending && <LoadingOutlined spin />}
          showSearch
          onClick={e => e.stopPropagation()}
          filterOption={productsFilterFn}
        />
      );
    }
    else if (dataIndex === 'discountedPrice') {
      renderForm = (
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          min="0"
          parser={discountPriceNumberInputParser}
        />
      );
    }
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        initialValue={record?.[dataIndex]}
      >
        {renderForm}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    );
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions
    <td {...restProps} onClick={toggleEdit}>
      {childNode}
    </td>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const ProductSelectTable: React.FC<{
  isFormEditable: Boolean;
  selectedProducts: SelectedProduct[];
  tableType: 'conditional' | 'benefit';
  showDiscountedPrice?: boolean;
}> = ({ isFormEditable, selectedProducts, tableType, showDiscountedPrice = false }) => {
  const dispatch = useDispatch();
  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const selectedLanguage = useSelector(getSelectedLanguage);
  const { t } = useTranslation('promoPage');
  const classes = useStyles();

  useEffect(() => {
    if (!suppliers.length) {
      dispatch(CommonCreators.getSuppliersRequest());
    }
  }, [dispatch, suppliers]);

  const defaultColumns: (ColumnTypes[number] & {
    isCellEditable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.IMAGE'),
      dataIndex: '',
      render: record => {
        return (
          record?.picURL ? (
            <img
              src={record?.picURL?.[selectedLanguage]}
              alt="product"
              width={50}
              height={50}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <Spin
                size="small"
              />
            </div>

          )
        );
      },
      width: '5%',
    },
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.PRODUCT'),
      dataIndex: '',
      render: record => {
        return (
          <div className={classes.flexDiv} id="benefit-type_product-name">
            <span>{record?.fullName?.[selectedLanguage]}</span>
            {record.saleLimit &&
            record?.alreadySold &&
            record?.alreadySold >= record?.saleLimit ? (
              <span className={classes.soldOutLabel}>SOLD OUT</span>
              ) : null}
          </div>
        );
      },
      width: '50%',
    },
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.ALREADY_SOLD'),
      dataIndex: '',
      render: record => {
        return record?.saleLimit ? (record?.alreadySold || 0) : '';
      },
    },
    ...showDiscountedPrice ?
      [
        {
          title: t('CONDITION_PRODUCTS.TABLE_TITLE.DISCOUNTED_PRICE'),
          dataIndex: 'discountedPrice',
          isCellEditable: true,
          render: (value: number) => (
            <div id="benefit-type_product-price">
              {value}
            </div>
          ),
        },
      ] : [],
    ...tableType === 'benefit' ?
      [
        {
          title: t('CONDITION_PRODUCTS.TABLE_TITLE.SALE_LIMIT'),
          dataIndex: 'saleLimit',
          isCellEditable: true,
          render: (value: number) => (
            <div id="benefit-type_product-sale-limit">
              {value}
            </div>
          ),
        },
      ] : [],
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.SUPPLIER_SUPPORT_RATE'),
      dataIndex: 'supplierSupport',
      isCellEditable: true,
      render: (value: number) => (
        <div id="benefit-type_product-supplier-support">
          {value}
        </div>
      ),
    },
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.SAP_REFER_CODE'),
      dataIndex: 'supplierSupportReferenceId',
      isCellEditable: true,
      width: '15%',
      render: (value: number) => (
        <div id="benefit-type_product-supplier-reference">
          {value}
        </div>
      ),
    },
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.THIRD_PARTY_SUPPORT_RATE'),
      dataIndex: 'thirdPartySupport',
      isCellEditable: true,
      render: (value: number) => (
        <div id="benefit-type_product-third-party-support">
          {value}
        </div>
      ),
    },
    {
      title: t('CONDITION_PRODUCTS.TABLE_TITLE.THIRD_PARTY_REFER_CODE'),
      dataIndex: 'thirdPartyReferenceId',
      isCellEditable: true,
      width: '15%',
      render: (value: number) => (
        <div id="benefit-type_product-third-party-reference">
          {value}
        </div>
      ),
    },
  ];

  const handleSave = (row: DataType) => {
    if (tableType === 'conditional') {
      dispatch(
        Creators.updateConditionalProductRequest({ data: { updatedProduct: row } }),
      );
    }
    if (tableType === 'benefit') {
      dispatch(
        Creators.updateBenefitProductRequest({ data: { updatedProduct: row } }),
      );
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.isCellEditable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        isCellEditable: col.isCellEditable,
        dataIndex: col.dataIndex,
        title: col.title,
        isFormEditable,
        handleSave,
        suppliers,
        isSupplierPending,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={selectedProducts}
        rowKey="id"
        columns={columns as ColumnTypes}
        loading={!selectedProducts.length}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductSelectTable;

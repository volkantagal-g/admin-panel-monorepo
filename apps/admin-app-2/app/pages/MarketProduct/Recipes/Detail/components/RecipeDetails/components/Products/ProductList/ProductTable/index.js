import { Form, Spin, Table, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutlined } from '@ant-design/icons';

import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { updateRecipeSelector } from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import SubstituteProductsModal from './SubstituteProductsModal';

import { Creators } from 'pages/MarketProduct/Recipes/Detail/redux/actions';
import useStyles from './styles';
import { ProductSelect } from './ProductSelect';
import { Arrows } from './Arrows';
import { getExcludedProducts } from './utils';

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <tr {...props} />
    </Form>
  );
};

const EditableCell = ({
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

  const toggleEdit = () => {
    if (isCellEditable && isFormEditable) {
      setEditing(!editing);
    }
  };

  const childNode = children;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions
    <td {...restProps} onClick={toggleEdit}>
      {childNode}
    </td>
  );
};

const onArrowClick = ({
  index,
  setSelectedProducts,
  direction,
  setSubstituteProductsModalData,
  setFieldValue,
  values,
}) => {
  let newIndex = index;

  if (direction === 'up' && index > 0) {
    newIndex = index - 1;
  }
  else if (direction === 'down' && index < values.products.length - 1) {
    newIndex = index + 1;
  }

  if (newIndex === index) {
    return;
  }

  const newProductsList = [...values.products];
  const temp = newProductsList[index];
  newProductsList[index] = newProductsList[newIndex];
  newProductsList[newIndex] = temp;

  setSelectedProducts(prevState => {
    const copy = [...prevState];
    const tempProduct = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = tempProduct;
    return copy;
  });

  setFieldValue('products', newProductsList);

  setSubstituteProductsModalData({
    productId: newProductsList[newIndex]?._id,
    substituteProductIds: newProductsList[newIndex]?.substituteProductIds,
    index: newIndex,
  });
};

const handleIsMustHaveChange = ({ index, value, setFieldValue, values }) => {
  const newValues = [...values.products];

  if (newValues[index]) {
    newValues[index] = {
      ...newValues[index],
      isMandatory: value,
    };
  }

  setFieldValue('products', newValues);
};

const handleSubstituteProductsChange = ({
  index,
  setFieldValue,
  setSubstituteProductsModalData,
  values,
  selectedProducts,
}) => {
  const newProductsList = [...values.products];

  newProductsList[index] = {
    ...newProductsList?.[index],
    substituteProductIds: selectedProducts,
  };

  setFieldValue('products', newProductsList);

  setSubstituteProductsModalData(prevState => {
    return {
      productId: prevState?.productId,
      substituteProductIds: selectedProducts,
      index,
    };
  });
};

const onSubstituteProductsModalClick = ({ record, index, dispatch, setSubstituteProductsModalData }) => {
  setSubstituteProductsModalData({
    productId: record?._id,
    substituteProductIds: record?.substituteProductIds,
    index,
  });
  dispatch(Creators.openSubstituteProductsModal());
};

const onDeleteClick = ({
  index,
  selectedProductsIndex,
  setFieldValue,
  substituteProductsModalData,
  setSubstituteProductsModalData,
  setSelectedProducts,
  values,
}) => {
  const newProductsList = [...values.products];
  newProductsList.splice(index, 1);
  setFieldValue('products', newProductsList);
  setSelectedProducts(prevState => {
    const copy = [...prevState];
    copy.splice(selectedProductsIndex, 1);
    return copy;
  });

  if (substituteProductsModalData?.index === index) {
    setSubstituteProductsModalData({});
  }
};

const ProductTable = ({
  isFormEditable,
  setFieldValue,
  setSelectedProducts,
  selectedProducts,
  values,
}) => {
  const { t } = useTranslation('recipesPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedLanguage = useSelector(getSelectedLanguage);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);

  const [substituteProductsModalData, setSubstituteProductsModalData] = useState({});

  const excludedProducts = getExcludedProducts({ products: values.products });

  const defaultColumns = [
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.SORT'),
      dataIndex: '',
      render: record => {
        const index = values.products.findIndex(item => item._id === record._id);
        if (index === -1) return null;
        return (
          <Arrows
            isUpdatePending={isUpdatePending}
            isFormEditable={isFormEditable}
            classes={classes}
            onArrowClick={onArrowClick}
            index={index}
            values={values}
            setSubstituteProductsModalData={setSubstituteProductsModalData}
            setFieldValue={setFieldValue}
            setSelectedProducts={setSelectedProducts}
            disabled={isUpdatePending || !isFormEditable}
          />
        );
      },
      width: '5%',
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.IMAGE'),
      dataIndex: '',
      render: record => {
        const index = values.products.findIndex(item => item._id === record._id);
        if (index === -1) return null;
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
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.MUST_HAVE'),
      dataIndex: 'isMandatory',
      render: (_, record) => {
        const index = values.products.findIndex(item => item._id === record._id);
        if (index === -1) return null;
        return (
          <Checkbox
            checked={record?.isMandatory}
            disabled={isUpdatePending || !isFormEditable}
            onChange={e => handleIsMustHaveChange({ index, value: e.target.checked, setFieldValue, values })}
          />
        );
      },
      align: 'center',
      width: '15%',
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.PRODUCT'),
      dataIndex: '',
      render: record => {
        return (
          <div>
            <ProductSelect
              disabled={isUpdatePending || !isFormEditable}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              record={record}
              excludedProducts={excludedProducts}
            />
          </div>
        );
      },
      width: '40%',
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.SUBSTITUTE_PRODUCTS'),
      dataIndex: '',
      render: record => {
        const foundIndex = values.products.findIndex(item => item._id === record._id);
        if (foundIndex === -1) return null;
        return (
          <Button
            onClick={() => {
              onSubstituteProductsModalClick({ record, index: foundIndex, dispatch, setSubstituteProductsModalData });
            }}
            disabled={isUpdatePending || !isFormEditable}
          >
            {t('DETAILS.PRODUCTS.SHOW_SUBSTITUTE_MODAL_BUTTON', { substituteProductsCount: record?.substituteProductIds?.length || 0 })}
          </Button>
        );
      },
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.DELETE'),
      dataIndex: '',
      render: record => {
        const index = values.products.findIndex(item => item._id === record._id);
        const selectedProductsIndex = selectedProducts.findIndex(item => item === record._id);
        if (index === -1) return null;
        return (
          <Button
            type="text"
            icon={<DeleteOutlined className={(index === -1 || isUpdatePending || !isFormEditable) ? undefined : classes.deleteIcon} />}
            onClick={() => onDeleteClick({
              index,
              selectedProductsIndex,
              setSubstituteProductsModalData,
              substituteProductsModalData,
              setFieldValue,
              setSelectedProducts,
              values,
            })}
            disabled={isUpdatePending || !isFormEditable}
          />
        );
      },
      width: '5%',
    },
  ];

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
      onCell: record => ({
        record,
        isCellEditable: col.isCellEditable,
        dataIndex: col.dataIndex,
        title: col.title,
        isFormEditable,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={[...values.products, {}]}
        rowKey="_id"
        columns={columns}
        loading={isUpdatePending}
        pagination={false}
      />
      <SubstituteProductsModal
        isFormEditable={isFormEditable}
        substituteProductsModalData={substituteProductsModalData}
        handleSubstituteProductsChange={handleSubstituteProductsChange}
        setSubstituteProductsModalData={setSubstituteProductsModalData}
        setFieldValue={setFieldValue}
        components={components}
        values={values}
      />
    </div>
  );
};

export default ProductTable;

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Spin, Table } from 'antd';

import { useEffect, useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';

import { Modal } from '@shared/components/GUI';

import {
  isSubstituteProductsModalOpenSelector,
  modalMarketProductsSelector,
  updateRecipeSelector,
} from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import { Creators } from 'pages/MarketProduct/Recipes/Detail/redux/actions';

import { ProductSelect } from '../ProductSelect';
import { SubstituteProductSelect } from './SubstituteProductSelect';
import { pagination } from '../../../constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { mergeSelectedModalProductData } from '../../../utils';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { Arrows } from '../Arrows';

import useStyles from '../styles';
import { getExcludedProducts } from '../utils';

const onArrowClick = ({
  index,
  direction,
  selectedProducts,
  setSelectedProducts,
}) => {
  let newIndex = index;
  if (direction === 'up' && index > 0) {
    newIndex = index - 1;
  }
  else if (direction === 'down' && index < selectedProducts.length - 1) {
    newIndex = index + 1;
  }

  setSelectedProducts(prevState => {
    const updatedProducts = [...prevState];
    const temp = updatedProducts[index];
    updatedProducts[index] = updatedProducts[newIndex];
    updatedProducts[newIndex] = temp;
    return updatedProducts;
  });
};

const onDeleteClick = ({ index, setSelectedProducts }) => {
  setSelectedProducts(prevState => {
    const newProductsList = [...prevState];
    newProductsList.splice(index, 1);
    return newProductsList;
  });
};

const SubstituteProductsModal = ({
  isFormEditable,
  substituteProductsModalData,
  handleSubstituteProductsChange,
  setSubstituteProductsModalData,
  setFieldValue,
  components,
  values,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedLanguage = useSelector(getSelectedLanguage);

  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const { t } = useTranslation('recipesPage');
  const isModalOpen = useSelector(isSubstituteProductsModalOpenSelector);
  const modalMarketProducts = useSelector(modalMarketProductsSelector.getData);

  const [selectedProducts, setSelectedProducts] = useState(substituteProductsModalData?.substituteProductIds || []);
  const [selectedSubstituteProductsWithDetails, setSelectedSubstituteProductsWithDetails] = useState([]);

  const excludedProducts = getExcludedProducts({ products: values.products, selectedSubstituteProducts: selectedProducts });

  const onOk = () => {
    handleSubstituteProductsChange({
      index: substituteProductsModalData?.index,
      values,
      setSubstituteProductsModalData,
      setFieldValue,
      selectedProducts,
      setSelectedProducts,
    });
    dispatch(Creators.closeSubstituteProductsModal());
  };

  const defaultColumns = [
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.SORT'),
      dataIndex: '',
      render: record => {
        const index = selectedProducts?.findIndex(item => item === record._id);
        if (index === -1) return null;
        return (
          <Arrows
            isUpdatePending={isUpdatePending}
            isFormEditable={isFormEditable}
            classes={classes}
            onArrowClick={onArrowClick}
            index={index}
            values={values}
            disabled={isUpdatePending || !isFormEditable}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        );
      },
      width: '5%',
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.IMAGE'),
      dataIndex: '',
      render: record => {
        const index = selectedProducts.findIndex(item => item === record._id);
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
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.PRODUCT'),
      dataIndex: '',
      render: record => {
        return (
          <div>
            <ProductSelect
              disabled={isUpdatePending || !isFormEditable}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              excludedProducts={excludedProducts}
              record={record}
            />
          </div>
        );
      },
      width: '50%',
    },
    {
      title: t('DETAILS.PRODUCTS.TABLE_TITLE.DELETE'),
      dataIndex: '',
      render: record => {
        const index = selectedProducts.findIndex(item => item === record._id);
        if (index === -1) return null;
        return (
          <Button
            type="text"
            icon={<DeleteOutlined className={(index === -1 || isUpdatePending || !isFormEditable) ? undefined : classes.deleteIcon} />}
            onClick={() => onDeleteClick({ index, setSelectedProducts })}
            disabled={isUpdatePending || !isFormEditable}
          />
        );
      },
      width: '5%',
    },
  ];

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

  useEffect(() => {
    setSelectedProducts(substituteProductsModalData?.substituteProductIds || []);
  }, [substituteProductsModalData]);

  useEffect(() => {
    if (!selectedProducts.length) {
      setSelectedSubstituteProductsWithDetails([]);
      return;
    }

    dispatch(Creators.getModalMarketProductsRequest({
      filters: {
        fields: ['name', 'fullName', 'picURL'],
        ids: selectedProducts,
        ...getLimitAndOffset(pagination),
      },
    }));
  }, [dispatch, selectedProducts]);

  useEffect(() => {
    if (!modalMarketProducts?.length) {
      return;
    }

    const mergedSelectedProductData = mergeSelectedModalProductData({
      substituteProductIds: selectedProducts,
      marketProducts: modalMarketProducts,
    });

    setSelectedSubstituteProductsWithDetails(mergedSelectedProductData);
  }, [modalMarketProducts, selectedProducts, setFieldValue]);

  const handleCancel = () => {
    setSelectedProducts(substituteProductsModalData?.substituteProductIds || []);
    dispatch(Creators.closeSubstituteProductsModal());
  };

  return (
    <Modal
      visible={isModalOpen}
      onCancel={handleCancel}
      onOk={onOk}
      okButtonProps={{ disabled: isUpdatePending }}
      width={800}
      title={t('NEW_RECIPE_MODAL.TITLE')}
    >
      <SubstituteProductSelect
        disabled={isUpdatePending || !isFormEditable}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        excludedProducts={excludedProducts}
      />
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={selectedSubstituteProductsWithDetails}
        rowKey="_id"
        columns={columns}
        loading={isUpdatePending}
        pagination={false}
      />
    </Modal>
  );
};

export default SubstituteProductsModal;

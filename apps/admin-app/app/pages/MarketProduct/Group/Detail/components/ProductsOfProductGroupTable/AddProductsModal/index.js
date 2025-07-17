import { Fragment, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Modal, Select, Typography, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { debounce } from 'lodash';

import { Creators } from '../../../redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { getMarketProductOptions, productOfProductGroupFilterOptions } from './formHelper';
import { getLimitAndOffset, getSelectFilterOption } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { productOfProductGroupFilters } from '@shared/shared/constantValues';
import {
  getMarketProductGroupSelector,
  updateMarketProductGroupSelector,
} from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import { useHideBodyScroll, usePrevious } from '@shared/hooks';

const { Text } = Typography;

const AddProductsModal = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { visible, onCancel, productsOfProductGroup } = props;
  const { t } = useTranslation('marketProductGroupPage');
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const marketProducts = useSelector(getMarketProductsSelector.getData);
  const isGetProductsPending = useSelector(getMarketProductsSelector.getIsPending);
  const isUpdateProductGroupPending = useSelector(updateMarketProductGroupSelector.getIsPending);
  const initialPagination = { currentPage: 1, rowsPerPage: 100 };
  const [pagination, setPagination] = useState({ ...initialPagination });
  const [queryText, setQueryText] = useState();
  const [selectedFilterOptions, setSelectedFilterOptions] = useState(Object.keys(productOfProductGroupFilters));
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [filteredMarketProducts, setFilteredMarketProducts] = useState([]);
  const [isSelectProductOpened, setIsSelectProductOpened] = useState(false);
  const [scrollableModal, setScrollableModal] = useState(null);
  const [triggerNode, setTriggerNode] = useState(null);
  const [productsDropdownPositionTop, setProductsDropdownPositionTop] = useState(0);
  const prevIsGetProductsPending = usePrevious(isGetProductsPending);
  useHideBodyScroll(visible);

  const handleAdd = () => {
    const productsToAdd = selectedProductIds
      .map(productId => ({ product: productId }));
    const body = { ...(productsToAdd?.length ? { productsToAdd } : undefined) };

    dispatch(Creators.updateMarketProductGroupRequest({
      id: marketProductGroup?._id,
      body,
    }));
  };

  const handleCancel = () => {
    onCancel();
    setSelectedProductIds([]);
    setQueryText();
    setSelectedFilterOptions(Object.keys(productOfProductGroupFilters));
    dispatch(CommonCreators.clearMarketProducts());
    setPagination({ ...initialPagination });
    setIsSelectProductOpened(false);
  };

  const handleFilterRequest = ({
    pagination: paginationInp,
    queryText: queryTextInp,
    selectedFilterOptions: selectedFilterOptionsInp,
  }) => {
    const options = {};
    selectedFilterOptionsInp.forEach(option => {
      options[option] = true;
    });
    dispatch(CommonCreators.getMarketProductsRequest({
      isActive: true,
      fields: ['fullName', 'suppliers'],
      queryText: queryTextInp,
      filterOptions: options,
      ...getLimitAndOffset(paginationInp),
    }));
  };

  const onFilterRequest = useCallback(debounce(handleFilterRequest, DEFAULT_DEBOUNCE_MS), []);

  useEffect(() => {
    if (visible) {
      onFilterRequest({
        pagination,
        queryText,
        selectedFilterOptions,
      });
    }
  }, [pagination.currentPage, pagination.rowsPerPage, visible, queryText, selectedFilterOptions]);

  useEffect(() => {
    if (visible && prevIsGetProductsPending && !isGetProductsPending) {
      setIsSelectProductOpened(true);
    }
  }, [isGetProductsPending]);

  useEffect(() => {
    const productIdsOfProductGroup = productsOfProductGroup
      .filter(item => item?._id)
      .map(item => item._id);
    const filteredProducts = marketProducts.filter(product => !productIdsOfProductGroup.includes(product?._id));
    setFilteredMarketProducts(filteredProducts);
  }, [marketProducts]);

  const handleOptionChange = options => {
    setSelectedFilterOptions(options);
  };

  const handleGetMoreData = event => {
    event.persist();
    const { target } = event;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      setPagination({ ...pagination, rowsPerPage: pagination.rowsPerPage + 25 });
    }
  };

  const handleNodeChange = () => {
    setProductsDropdownPositionTop((triggerNode?.getBoundingClientRect()?.height || 0) + 5);
  };
  const handleDropdownPositionChange = () => {
    setTimeout(() => setProductsDropdownPositionTop(triggerNode?.getBoundingClientRect()?.height), 500);
  };

  useEffect(() => {
    if (scrollableModal) {
      scrollableModal?.[0]?.addEventListener('scroll', handleNodeChange);
    }
    return () => {
      scrollableModal?.[0]?.removeEventListener('scroll', handleNodeChange);
    };
  }, [scrollableModal]);

  return (
    <Modal
      width={800}
      wrapClassName="new_products_modal"
      title={t('ADD_NEW_PRODUCTS')}
      visible={visible}
      onCancel={handleCancel}
      style={{ top: theme.spacing(5) }}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleAdd}
          loading={isUpdateProductGroupPending}
          disabled={!selectedProductIds?.length}
        >
          {t('button:ADD')}
        </Button>,
      ]}
    >
      <Row gutter={theme.spacing(3)}>
        <Col span={24} className="mb-3">
          <Text>{t('FILTER_OPTION')}</Text>
          <Select
            value={selectedFilterOptions}
            mode="multiple"
            placeholder={t('FILTER_OPTION')}
            onChange={handleOptionChange}
            showArrow={false}
            className="w-100"
            showSearch
            filterOption={getSelectFilterOption}
          >
            {productOfProductGroupFilterOptions}
          </Select>
        </Col>
        <Col span={24} className="mb-3">
          <Text>{t('SEARCH')}</Text>
          <Input
            placeholder={t('SEARCH')}
            value={queryText}
            onChange={({ target }) => setQueryText(target.value)}
          />
        </Col>
        <Col span={24}>
          <Text>{t('PRODUCTS')}</Text>
          <Select
            open={isSelectProductOpened}
            placeholder={t('SELECT_PRODUCTS')}
            value={selectedProductIds}
            className="w-100"
            mode="multiple"
            onChange={productIds => setSelectedProductIds(productIds)}
            onPopupScroll={handleGetMoreData}
            loading={isGetProductsPending}
            onDropdownVisibleChange={value => {
              setIsSelectProductOpened(value);
              handleDropdownPositionChange();
            }}
            dropdownAlign={{ overflow: { adjustY: 0 } }}
            dropdownStyle={{ top: productsDropdownPositionTop }}
            getPopupContainer={newTriggerNode => {
              setTriggerNode(newTriggerNode.parentNode);
              setScrollableModal(document.getElementsByClassName('new_products_modal'));
              return newTriggerNode.parentNode;
            }}
            dropdownRender={menu => (
              <div key="1">
                <Fragment key="2">
                  {menu}
                </Fragment>
                <Row key="3" className="d-flex align-items justify-content-center m-2">
                  <Button type="primary" onClick={handleGetMoreData} loading={isGetProductsPending}>
                    {t('button:GET_MORE_DATA')}
                  </Button>
                </Row>
              </div>
            )}
            filterOption={false}
            showSearch={false}
          >
            {getMarketProductOptions(filteredMarketProducts)}
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddProductsModal;

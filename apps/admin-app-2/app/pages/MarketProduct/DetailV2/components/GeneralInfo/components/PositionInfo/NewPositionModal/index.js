import { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Alert, Tooltip, Divider } from 'antd';
import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { get, filter, findIndex } from 'lodash';

import { Modal, Select, Checkbox, NumberInput, Search } from '@shared/components/GUI';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { MARKET_PRODUCT_CATEGORY_STATUS, PRODUCT_CATEGORY_TYPE } from '@shared/shared/constants';
import { productCategoryTypes } from '@shared/shared/constantValues';
import useStyles from './styles';
import { getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';
import {
  addMarketCategoryPositionSelector,
  getMarketProductByIdSelector,
  getProductsOfSubCategorySelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { ProductList } from './ProductList';
import { usePrevious } from '@shared/hooks';

const { Option } = Select;

export const NewPositionModal = memo(function NewPositionModal({
  addCategoryPosition,
  onCancel,
  isMainCategoryFunc,
}) {
  const dispatch = useDispatch();
  const positions = useSelector(getMarketProductByIdSelector.getPositions);
  const marketProductCategoriesData = useSelector(getMarketProductCategoriesSelector.getData);
  const subCategoryProductPositions = useSelector(getProductsOfSubCategorySelector.getSubCategoryProductPositions);
  const isPendingRequest = useSelector(getProductsOfSubCategorySelector.getIsPending);
  const isAddPending = useSelector(addMarketCategoryPositionSelector.getIsPending);
  const isPrevAddPending = usePrevious(isAddPending);
  const classes = useStyles();
  const { t } = useTranslation('marketProductPageV2');
  const [marketProductCategories, setMarketProductCategories] = useState(marketProductCategoriesData);
  const [areInactiveCategoriesVisible, setAreInactiveCategoriesVisible] = useState(false);
  const [isPositionItemWarningVisible, setIsPositionItemWarningVisible] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [enteredPosition, setEnteredPosition] = useState();
  const theme = useTheme();
  const marketProductCategoriesMap = createMap(marketProductCategoriesData);
  const [searchedText, setSearchedText] = useState();
  const selectableMarketProductCategories = marketProductCategories.filter(({ parent = false }) => {
    return !parent;
  });

  useEffect(() => {
    if (marketProductCategoriesData?.length) {
      const categories = areInactiveCategoriesVisible ?
        marketProductCategoriesData :
        marketProductCategoriesData.filter(item => item?.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE);
      setMarketProductCategories(categories);
    }
  }, [areInactiveCategoriesVisible, marketProductCategoriesData]);

  const positionsMap = {};
  positions.forEach(position => {
    const id = get(position, 'subCategory._id');
    positionsMap[id] = position;
  });

  const handleCancel = useCallback(() => {
    if (subCategoryProductPositions) {
      dispatch(Creators.resetProductsOfSubCategory());
    }
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setIsPositionItemWarningVisible(false);
    setAreInactiveCategoriesVisible(false);
    setSubCategories([]);
    setSearchedText();
    onCancel();
  }, [dispatch, onCancel, subCategoryProductPositions]);

  useEffect(() => {
    const isAddRequestCompleted = isPrevAddPending && !isAddPending;
    if (isAddRequestCompleted) {
      handleCancel();
    }
  }, [isPrevAddPending, isAddPending, handleCancel]);

  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      dispatch(Creators.getProductsOfSubCategoryRequest({
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
      }));
      setIsPositionItemWarningVisible(true);
    }
  }, [dispatch, selectedCategory, selectedSubCategory]);

  const getCategoryOptions = useCallback((categories = []) => {
    return categories?.map(category => {
      const value = get(category, '_id', '');
      const label = get(category, ['name', getLangKey()], '');
      const isCategoryActive = category.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
      const optionClass = isCategoryActive ? classes.activeCategory : classes.inactiveCategory;
      const categoryActivenessText = isCategoryActive ? t('POSITION_INFO.ACTIVE_CATEGORY') : t('POSITION_INFO.INACTIVE_CATEGORY');
      const categoryTypeText = productCategoryTypes?.[category.type]?.[getLangKey()];
      const tooltipTitle = `${categoryActivenessText} (${categoryTypeText})`;
      return (
        <Option key={value} value={value} label={label} className={optionClass}>
          <Tooltip title={tooltipTitle}>
            {label}
          </Tooltip>
        </Option>
      );
    });
  }, [classes.activeCategory, classes.inactiveCategory, t]);

  const updateSubCategories = categoryId => {
    // filter out the categories that are not the children of this category AND already existing subcategories
    const subcategories = filter(marketProductCategories, subCategory => {
      return subCategory?.parent === categoryId && findIndex(positions, { subCategory: subCategory?._id }) === -1;
    });
    const category = marketProductCategoriesMap?.[categoryId];
    if (category.type === PRODUCT_CATEGORY_TYPE.DISCOUNTED) {
      const mainCategoryId = positions?.find(position => isMainCategoryFunc(position))?.category._id;
      const mainCategory = marketProductCategoriesMap?.[mainCategoryId];
      const isMainCategoryActive = mainCategory?.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
      const fakeSubCategories = mainCategory && (isMainCategoryActive || (!isMainCategoryActive && areInactiveCategoriesVisible)) ? [mainCategory] : [];
      return setSubCategories(fakeSubCategories);
    }

    if (!(subcategories && subcategories.length > 0)) {
      return setSubCategories([]);
    }

    return setSubCategories(subcategories);
  };

  const handleCategoryChange = value => {
    setSelectedCategory(value);
    setSelectedSubCategory(null);
    updateSubCategories(value);
  };

  const handleSubCategoryChange = value => {
    setSelectedSubCategory(value);
  };

  const handleCheckboxChange = () => {
    setAreInactiveCategoriesVisible(!areInactiveCategoriesVisible);
    if (subCategoryProductPositions) {
      dispatch(Creators.resetProductsOfSubCategory());
    }
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setIsPositionItemWarningVisible(false);
    setSubCategories([]);
  };

  const handleCloseAlertMessage = () => {
    setIsPositionItemWarningVisible(false);
  };

  const memoizedCategoryOptions = useMemo(
    () => getCategoryOptions(selectableMarketProductCategories),
    [getCategoryOptions, selectableMarketProductCategories],
  );

  const memoizedSubCategoryOptions = useMemo(
    () => getCategoryOptions(subCategories),
    [getCategoryOptions, subCategories],
  );

  return (
    <Modal
      title={`${t('POSITION_INFO.NEW_PRODUCT_POSITION')}`}
      width={520}
      visible
      okText={t('button:ADD')}
      onOk={() => addCategoryPosition(selectedCategory, selectedSubCategory, enteredPosition)}
      onCancel={handleCancel}
      centered
      okButtonProps={{ disabled: !selectedSubCategory || !(subCategoryProductPositions?.length >= 0) }}
    >
      <>
        <Row gutter={[theme.spacing(3), theme.spacing(3)]}>
          <Col span={24}>
            <Checkbox
              checked={areInactiveCategoriesVisible}
              onChange={handleCheckboxChange}
            >
              {t('POSITION_INFO.SHOW_INACTIVE_CATEGORIES_SUBCATEGORIES')}
            </Checkbox>
          </Col>
          <Col span={24}>
            <Select
              className="w-100"
              label={t('POSITION_INFO.CATEGORY')}
              value={selectedCategory}
              onChange={handleCategoryChange}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            >
              {memoizedCategoryOptions}
            </Select>
          </Col>
          <Col span={24} className="mb-2">
            <Select
              disabled={!selectedCategory}
              className="w-100"
              label={t('POSITION_INFO.SUB_CATEGORY')}
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            >
              {memoizedSubCategoryOptions}
            </Select>
          </Col>
        </Row>
        {subCategoryProductPositions?.length >= 0 && (
          <>
            <Divider className="mb-2 mt-2" />
            <div>
              <p className={classes.title}>{t('POSITION_INFO.PREVIEW')}</p>
              <Row gutter={[theme.spacing(3), theme.spacing(3)]} className="mt-2">
                <Col span={24}>
                  <Search
                    onChange={event => {
                      const val = event?.target?.value;
                      setSearchedText(val);
                    }}
                  />
                </Col>
                <Col span={24}>
                  <ProductList searchedText={searchedText} />
                </Col>
                <Col span={24}>
                  <NumberInput
                    data-testid="position-number-input"
                    label={t('POSITION_INFO.POSITION')}
                    value={enteredPosition}
                    onChange={setEnteredPosition}
                  />
                </Col>
              </Row>
            </div>
          </>
        )}
        {isPositionItemWarningVisible && !subCategoryProductPositions && !isPendingRequest && (
          <Alert
            className="mt-4"
            message={t('POSITION_INFO.MISSING_POSITION_ITEMS_WARNING_MESSAGE')}
            banner
            type="warning"
            closable
            afterClose={handleCloseAlertMessage}
          />
        )}
      </>
    </Modal>
  );
});

NewPositionModal.propTypes = {
  addCategoryPosition: PropTypes.func,
  onCancel: PropTypes.func,
  isMainCategoryFunc: PropTypes.func,
};

NewPositionModal.defaultProps = {
  addCategoryPosition: () => {},
  onCancel: () => {},
  isMainCategoryFunc: () => {},
};

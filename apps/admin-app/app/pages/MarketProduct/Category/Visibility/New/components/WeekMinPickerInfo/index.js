import { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Row, Col, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get, isNumber } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { getDomainTypeOptions } from '@shared/utils/formHelper';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  getMarketProductCategoriesSelector,
  getMarketProductSubCategoriesSelector,
} from '@shared/redux/selectors/common';
import { Creators } from '../../redux/actions';
import { createMarketProductCategoryAvailableTimeSelector } from '../../redux/selectors';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getAvailableTimeBoxesMap, getInitialAvailableTimes, transformFromTimeBoxesToAvailableTimes } from '@shared/utils/availableTime';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getColoredSubCategoryOptionGroups,
  getColoredCategoryOptions,
  getWarehouseOptionGroups,
  renderDropdownMenu,
} from '@app/pages/MarketProduct/utils';
import useStyles from './styles';
import SelectCity from '@shared/containers/Select/City';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getWarehousesByCityMap } from '@app/pages/MarketProduct/Category/Visibility/New/components/WeekMinPickerInfo/utils';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

const MAX_TAG_COUNT_ON_SELECT_INPUT = 10;

const WeekMinPickerInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductCategoryVisibilityPage');
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedWarehouseIds, setSelectedWarehouseIds] = useState([]);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  const [selectedDomainTypes, setSelectedDomainTypes] = useState([]);
  const [captureHours, setCaptureHours] = useState(false);
  const [availableTimeBoxesMap, setAvailableTimeBoxesMap] = useState(getAvailableTimeBoxesMap(getInitialAvailableTimes()));
  const [isSelectAllClickedLast, setIsSelectAllClickedLast] = useState(false);

  const handleFilterWarehousesCallback = useCallback(params => {
    dispatch(CommonCreators.getFilteredWarehousesRequest({ cities: params.cities, fields: 'name city country region', populate: ['geo'] }));
  }, [dispatch]);

  const handleGetMarketProductSubcategoriesCallback = useCallback(params => {
    if (params?.parents?.length) {
      dispatch(CommonCreators.getMarketProductSubCategoriesRequest({ parents: params.parents }));
    }
  }, [dispatch]);

  const { debouncedCallback: debouncedFilterWarehouses } = useDebouncedCallback({
    callback: handleFilterWarehousesCallback,
    delay: DEFAULT_DEBOUNCE_MS,
  });
  const { debouncedCallback: debouncedGetMarketProductSubcategories } = useDebouncedCallback({
    callback: handleGetMarketProductSubcategoriesCallback,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const marketProductCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const isCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const marketProductSubCategories = useSelector(getMarketProductSubCategoriesSelector.getData);
  const isSubCategoriesPending = useSelector(getMarketProductSubCategoriesSelector.getIsPending);
  const isPending = useSelector(createMarketProductCategoryAvailableTimeSelector.getIsPending);
  const selectedCountry = useSelector(getSelectedCountry);
  const selectedCountryTimezone = get(selectedCountry, 'timezones.0.timezone');
  const theme = useTheme();
  const classes = useStyles();

  const isValidToSave = !!selectedCategoryIds?.length && !!selectedWarehouseIds?.length;

  const handleCityChange = val => {
    setSelectedCities(val);
    setSelectedWarehouseIds();
    debouncedFilterWarehouses({ cities: val });
  };

  const handleCategoryChange = val => {
    setSelectedCategoryIds(val);
    setSelectedSubCategoryIds();
    debouncedGetMarketProductSubcategories({ parents: val });
    if (!val?.length) {
      dispatch(CommonCreators.clearMarketProductSubCategories());
    }
  };

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (isNumber(timeIndex) && (captureHours || doCapture)) {
      setAvailableTimeBoxesMap({
        ...availableTimeBoxesMap,
        [timeIndex]: !availableTimeBoxesMap[timeIndex],
      });
    }
  };

  const handleSelectAllCities = () => {
    const allCityIds = cities.map(({ _id }) => _id);
    handleCityChange(allCityIds);
  };

  const handleUnselectAllCities = () => {
    handleCityChange([]);
  };

  const handleSelectAllWarehouses = () => {
    const warehouseIds = (warehouses || [])?.map(warehouse => warehouse?._id);
    setSelectedWarehouseIds(warehouseIds);
  };

  const handleUnselectAllWarehouses = () => {
    setSelectedWarehouseIds([]);
  };

  const handleSelectAllCategories = () => {
    const categoryIds = (marketProductCategories || [])?.map(category => category?._id);
    handleCategoryChange(categoryIds);
  };

  const handleUnselectAllCategories = () => {
    handleCategoryChange([]);
  };

  const handleSelectAllSubCategories = () => {
    const subCategoryIds = (marketProductSubCategories || [])?.map(subCategory => subCategory?._id);
    setSelectedSubCategoryIds(subCategoryIds);
  };

  const handleUnselectAllSubCategories = () => {
    setSelectedSubCategoryIds([]);
  };

  const handleSelectAllDomainTypes = () => {
    setSelectedDomainTypes(Object.keys(getirMarketDomainTypes));
  };

  const handleUnselectAllDomainTypes = () => {
    setSelectedDomainTypes([]);
  };

  const handleMouseUp = () => {
    setCaptureHours(false);
  };

  const handleMouseOver = timeIndex => {
    updateTimesState(timeIndex);
  };

  const handleMouseDown = timeIndex => {
    updateTimesState(timeIndex, true);
    setCaptureHours(true);
  };

  const handleSaveClick = () => {
    const warehousesByCityMap = getWarehousesByCityMap(warehouses);
    const selectedPairs = selectedCities.map(cityId => {
      const cityWarehouses = warehousesByCityMap[cityId];
      const warehouse = cityWarehouses?.find(cityWarehouse => selectedWarehouseIds.includes(cityWarehouse?._id));
      return { cityId, warehouse };
    });
    const hasMissingPair = selectedPairs.some(({ warehouse }) => !warehouse);
    if (hasMissingPair) {
      return dispatch(ToastCreators.error({ message: t('ERROR.WAREHOUSE_MUST_BE_SELECTED_FOR_EACH_SELECTED_CITY') }));
    }
    if (!isValidToSave) {
      return dispatch(ToastCreators.error({ message: t('ERROR.WAREHOUSE_AND_CATEGORY_MUST_BE_SELECTED') }));
    }
    const availableTimes = transformFromTimeBoxesToAvailableTimes(availableTimeBoxesMap);
    const marketProductSubCategoriesMap = createMap(marketProductSubCategories);
    const selectedSubCategories = selectedSubCategoryIds
      ?.filter(id => marketProductSubCategoriesMap?.[id])
      .map(id => marketProductSubCategoriesMap?.[id]);
    const selectedSubCategoriesMapByCategoryId = createMap(selectedSubCategories, { field: 'parent._id' });
    const categoryIdsWithNoSubcategorySelected = selectedCategoryIds?.filter(categoryId => !selectedSubCategoriesMapByCategoryId?.[categoryId]);
    const body = {
      warehouseIds: selectedWarehouseIds,
      categoryIds: categoryIdsWithNoSubcategorySelected,
      subCategoryIds: selectedSubCategoryIds,
      availableTimes,
      timezone: selectedCountryTimezone,
      domainTypes: selectedDomainTypes,
    };

    return dispatch(Creators.createMarketProductCategoryAvailableTimeRequest({ body }));
  };

  const selectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(true);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes));
    setIsSelectAllClickedLast(true);
  };

  const unselectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(false);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes));
    setIsSelectAllClickedLast(false);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isSelectAllClickedLast ? (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={unselectAllTimes}>
              {t('button:UNSELECT_ALL')}
            </Button>
          </Form.Item>
        </Col>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={selectAllTimes}>
              {t('button:SELECT_ALL')}
            </Button>
          </Form.Item>
        </Col>
      )}
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button
            size="small"
            onClick={handleSaveClick}
            type="primary"
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );

  const warehouseOptions = useMemo(
    () => getWarehouseOptionGroups(warehouses),
    [warehouses],
  );

  return (
    <>
      <AntCard key="1">
        <Row gutter={theme.spacing(3)} className="mb-3">
          <Col span={8}>
            <SelectCity
              value={selectedCities}
              mode="multiple"
              onChange={handleCityChange}
              dropdownRender={menu => renderDropdownMenu({
                menu,
                t,
                selectedData: selectedCities,
                data: cities,
                onSelectAll: handleSelectAllCities,
                onUnselectAll: handleUnselectAllCities,
              })}
              loading={isCitiesPending}
              disabled={isCitiesPending}
              maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
              getPopupContainer={trigger => trigger?.parentNode}
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder={t('global:WAREHOUSE')}
              className="w-100"
              value={selectedWarehouseIds}
              onChange={warehouseIds => setSelectedWarehouseIds(warehouseIds)}
              autoComplete="off"
              loading={isWarehousesPending}
              disabled={isWarehousesPending || !warehouses.length}
              allowClear
              showSearch
              mode="multiple"
              filterOption={getSelectFilterOption}
              dropdownRender={menu => renderDropdownMenu({
                menu,
                t,
                selectedData: selectedWarehouseIds,
                data: warehouses,
                onSelectAll: handleSelectAllWarehouses,
                onUnselectAll: handleUnselectAllWarehouses,
              })}
              maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
              getPopupContainer={trigger => trigger?.parentNode}
            >
              {warehouseOptions}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              placeholder={t('global:CATEGORY')}
              className="w-100"
              value={selectedCategoryIds}
              onChange={handleCategoryChange}
              autoComplete="off"
              loading={isCategoriesPending}
              allowClear
              showSearch
              mode="multiple"
              filterOption={getSelectFilterOption}
              dropdownRender={menu => renderDropdownMenu({
                menu,
                t,
                selectedData: selectedCategoryIds,
                data: marketProductCategories,
                onSelectAll: handleSelectAllCategories,
                onUnselectAll: handleUnselectAllCategories,
              })}
              maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
              getPopupContainer={trigger => trigger?.parentNode}
            >
              {getColoredCategoryOptions({ categories: marketProductCategories, classes, t })}
            </Select>
          </Col>
        </Row>
        <Row gutter={theme.spacing(3)} className="mb-3">
          <Col span={8}>
            <Select
              placeholder={t('global:SUB_CATEGORY')}
              className="w-100"
              value={selectedSubCategoryIds}
              onChange={subCategoryIds => setSelectedSubCategoryIds(subCategoryIds)}
              autoComplete="off"
              loading={isSubCategoriesPending}
              disabled={!selectedCategoryIds?.length || !marketProductSubCategories?.length}
              allowClear
              showSearch
              mode="multiple"
              filterOption={getSelectFilterOption}
              dropdownRender={menu => renderDropdownMenu({
                menu,
                t,
                selectedData: selectedSubCategoryIds,
                data: marketProductSubCategories,
                onSelectAll: handleSelectAllSubCategories,
                onUnselectAll: handleUnselectAllSubCategories,
              })}
              maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
              getPopupContainer={trigger => trigger?.parentNode}
            >
              {getColoredSubCategoryOptionGroups({ marketProductCategories, selectedCategoryIds, marketProductSubCategories, classes, t })}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              placeholder={t('global:DOMAIN_TYPE')}
              className="w-100"
              value={selectedDomainTypes}
              options={getDomainTypeOptions()}
              onChange={domainTypes => setSelectedDomainTypes(domainTypes)}
              autoComplete="off"
              allowClear
              showSearch
              mode="multiple"
              filterOption={getSelectFilterOption}
              dropdownRender={menu => renderDropdownMenu({
                menu,
                t,
                selectedData: selectedDomainTypes,
                data: Object.keys(getirMarketDomainTypes),
                onSelectAll: handleSelectAllDomainTypes,
                onUnselectAll: handleUnselectAllDomainTypes,
              })}
              maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
              getPopupContainer={trigger => trigger?.parentNode}
            />
          </Col>
        </Row>
      </AntCard>
      <AntCard bordered={false} footer={cardFooter}>
        <WeekMinPicker
          availableTimes={availableTimeBoxesMap}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          handleMouseOver={handleMouseOver}
          shouldRender
        />
      </AntCard>
    </>
  );
};

export default WeekMinPickerInfo;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Row, Col, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { getCityOptions, getWarehouseOptions, getDomainTypeOptions } from '@shared/utils/formHelper';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import {
  getCitiesSelector,
  getWarehousesSelector,
  getMarketProductCategoriesSelector,
} from '@shared/redux/selectors/common';
import { Creators } from '../../redux/actions';
import { getMarketProductCategoryAvailableTimeSelector, updateMarketProductCategoryAvailableTimeSelector } from '../../redux/selectors';
import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import { getAvailableTimeBoxesMap, getInitialAvailableTimes, transformFromTimeBoxesToAvailableTimes } from '@shared/utils/availableTime';
import { getColoredCategoryOptions } from '@app/pages/MarketProduct/utils';
import useStyles from './styles';

const WeekMinPickerInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductCategoryVisibilityPage');
  const [captureHours, setCaptureHours] = useState(false);
  const currentCategoryAvailableTime = useSelector(getMarketProductCategoryAvailableTimeSelector.getData);
  const [availableTimeBoxesMap, setAvailableTimeBoxesMap] = useState(getAvailableTimeBoxesMap(currentCategoryAvailableTime.availableTimes));
  const [isSelectAllClickedLast, setIsSelectAllClickedLast] = useState(false);

  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const marketProductCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const categoriesMap = createMap(marketProductCategories);
  const warehousesMap = createMap(warehouses);
  const isCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const isPending = useSelector(updateMarketProductCategoryAvailableTimeSelector.getIsPending);
  const theme = useTheme();
  const [isWeekMinPickerEditable, setIsWeekMinPickerEditable] = useState(false);

  useEffect(() => {
    if (currentCategoryAvailableTime._id) {
      const timeBoxesMap = getAvailableTimeBoxesMap(currentCategoryAvailableTime.availableTimes);
      setAvailableTimeBoxesMap(timeBoxesMap);
    }
  }, [currentCategoryAvailableTime]);

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (_.isNumber(timeIndex) && (captureHours || doCapture)) {
      setAvailableTimeBoxesMap({
        ...availableTimeBoxesMap,
        [timeIndex]: !availableTimeBoxesMap[timeIndex],
      });
    }
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
    const availableTimes = transformFromTimeBoxesToAvailableTimes(availableTimeBoxesMap);
    const body = { availableTimes };
    setIsWeekMinPickerEditable(false);
    dispatch(Creators.updateMarketProductCategoryAvailableTimeRequest({ id: currentCategoryAvailableTime._id, body }));
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

  const handleCancel = () => {
    setIsWeekMinPickerEditable(false);
    const timeBoxesMap = getAvailableTimeBoxesMap(currentCategoryAvailableTime.availableTimes);
    setAvailableTimeBoxesMap(timeBoxesMap);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isWeekMinPickerEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancel}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
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
        </>
      ) : (
        <Col key="4">
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={() => setIsWeekMinPickerEditable(true)}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  let currentCategory = currentCategoryAvailableTime.category;
  if (currentCategoryAvailableTime.isSubCategory) {
    currentCategory = _.get(categoriesMap, [currentCategoryAvailableTime.category, 'parent']);
  }

  const currentCity = _.get(warehousesMap, [currentCategoryAvailableTime.warehouse, 'city', '_id']);

  return (
    <>
      <AntCard key="1">
        <Row gutter={theme.spacing(3)} className="mb-3">
          <Col span={8}>
            <Select
              disabled
              placeholder={t('global:CITY')}
              className="w-100"
              value={currentCity}
              options={getCityOptions(cities)}
              autoComplete="off"
              loading={isCitiesPending}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col span={8}>
            <Select
              disabled
              placeholder={t('global:WAREHOUSE')}
              className="w-100"
              value={currentCategoryAvailableTime.warehouse}
              options={getWarehouseOptions(warehouses)}
              autoComplete="off"
              loading={isWarehousesPending}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col span={8}>
            <Select
              disabled
              placeholder={t('global:CATEGORY')}
              className="w-100"
              value={currentCategory}
              autoComplete="off"
              loading={isCategoriesPending}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            >
              {getColoredCategoryOptions({ categories: marketProductCategories, classes, t })}
            </Select>
          </Col>
        </Row>
        <Row gutter={theme.spacing(3)} className="mb-3">
          <Col span={8}>
            <Select
              disabled
              placeholder={t('global:SUB_CATEGORY')}
              className="w-100"
              value={currentCategoryAvailableTime.isSubCategory ? currentCategoryAvailableTime.category : null}
              autoComplete="off"
              loading={isCategoriesPending}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            >
              {getColoredCategoryOptions({ categories: marketProductCategories, classes, t })}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              disabled
              placeholder={t('global:DOMAIN_TYPE')}
              className="w-100"
              value={_.toString(currentCategoryAvailableTime.domainType)}
              options={getDomainTypeOptions()}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
      </AntCard>
      <AntCard bordered={false} footer={cardFooter}>
        <WeekMinPicker
          availableTimes={availableTimeBoxesMap}
          isDisabled={!isWeekMinPickerEditable}
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

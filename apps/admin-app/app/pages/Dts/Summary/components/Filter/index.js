import { useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Button,
  Select,
  Input,
  DatePicker,
  Typography,
  Radio,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { WAREHOUSE_TYPES, DOMAIN_FILTER_TYPES, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { getCitiesSelector, getSelectedCountryTimezone, getMarketFranchisesSelector } from '@shared/redux/selectors/common';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const TagOption = (value, text) => {
  return (
    <Option
      value={value}
      key={value}
    >
      <Text>{text}</Text>
    </Option>
  );
};

const CityTagOption = (value, text) => {
  return (
    <Option
      value={`${text}_${value}`}
      key={value}
    >
      <Text>{text}</Text>
    </Option>
  );
};

const DATE_TYPES = {
  DAY: 'day',
  MONTH: 'month',
  RANGE: 'range',
};

const Filter = () => {
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData);
  const marketFranchisesSelector = useSelector(getMarketFranchisesSelector.getData);
  const selectedCities = useSelector(filtersSelector.getCities);
  const selectedDomainTypes = useSelector(filtersSelector.getDomainTypes);
  const selectedWarehouseTypes = useSelector(filtersSelector.getWarehouseTypes);
  const searchValue = useSelector(filtersSelector.getSearchValue);
  const timezone = useSelector(getSelectedCountryTimezone.getData);
  const { t } = useTranslation(['global', 'dtsSummaryPage']);
  const classes = useStyles();

  const initialDate = () => {
    return moment.tz(timezone).subtract(1, 'day').endOf('day');
  };

  const [monthDate, setMonthDate] = useState(initialDate());
  const [monthDateRange, setMonthDateRange] = useState([initialDate(), initialDate().subtract(90, 'days')]);
  const [dayDate, setDayDate] = useState(initialDate());
  const [domainFilterTypeState, setDomainFilterType] = useState(DOMAIN_FILTER_TYPES.INCLUDES);
  const [citiesState, setCitiesState] = useState(selectedCities);
  const [warehouseTypeState, setWarehouseTypeState] = useState(selectedWarehouseTypes);
  const [domainTypeState, setDomainTypeState] = useState(selectedDomainTypes);
  const [changedDateType, setChangedDateType] = useState(DATE_TYPES.DAY);
  const [franchiseId, setFranchiseId] = useState(null);

  const handleMonthChange = selects => {
    if (selects) {
      setMonthDate(selects);
      setChangedDateType(DATE_TYPES.MONTH);
    }
  };

  const handleDateRangeChange = ([startDate, endDate]) => {
    if (startDate && endDate) {
      setMonthDateRange([startDate, endDate]);
      setChangedDateType(DATE_TYPES.RANGE);
    }
  };

  const handleDayDateChange = selects => {
    if (selects) {
      setDayDate(selects);
      setChangedDateType(DATE_TYPES.DAY);
    }
  };

  const handleDomainTypeChange = selects => {
    setDomainTypeState(selects);
  };

  const handleDomainFilterTypeChange = selects => {
    setDomainFilterType(selects);
  };

  const handleWarehouseTypeChange = selects => {
    setWarehouseTypeState(selects);
  };

  const handleCityChange = selects => {
    setCitiesState(selects);
  };

  const handleFranchiseSelect = selects => {
    setFranchiseId(selects);
  };

  const handleSelectAllCitiesButton = () => {
    const newSelectedCities = cities.map(city => {
      return `${city.name[getLangKey()]}_${city._id}`;
    });
    setCitiesState(newSelectedCities);
  };

  const handleResetButtonClick = () => {
    setCitiesState([]);
  };

  const handleFetchButtonClick = () => {
    if (changedDateType === DATE_TYPES.MONTH) {
      dispatch(Creators.getResultsRequest({ date: monthDate.date(25).endOf('day').toISOString(), franchiseId }));
    }
    else if (changedDateType === DATE_TYPES.RANGE) {
      const [startDate, endDate] = monthDateRange;
      dispatch(Creators.getPointsRequest({ startDate: startDate.toISOString(), endDate: endDate.toISOString(), franchiseId }));
    }
    else if (changedDateType === DATE_TYPES.DAY) {
      dispatch(Creators.getResultsRequest({ date: dayDate.endOf('day').toISOString(), franchiseId }));
    }
  };

  const handleActionButtonClick = () => {
    dispatch(Creators.setDomainTypes({ domainTypes: domainTypeState }));
    dispatch(Creators.setDomainFilterType({ domainFilterType: domainFilterTypeState }));
    dispatch(Creators.setWarehouseTypes({ warehouseTypes: warehouseTypeState }));
    dispatch(Creators.setCities({ cities: citiesState }));
  };

  const domainTypeList = GETIR_MARKET_DOMAIN_TYPES.map(tag => {
    const tagText = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const warehouseTypesList = WAREHOUSE_TYPES.map(warehouseType => {
    const tagText = t(`global:WAREHOUSE_TYPES:${warehouseType}`);
    const customValue = warehouseType.toString();
    return TagOption(customValue, tagText);
  });

  const franchiseList = marketFranchisesSelector.map(tag => {
    return TagOption(tag._id, tag.name);
  });

  const cityList = cities.map(tag => {
    return CityTagOption(tag._id, tag.name[getLangKey()]);
  });

  const onSearchInputSubmit = inputValue => {
    if (inputValue === searchValue) {
      return;
    }
    dispatch(Creators.setSearchValue({ searchValue: inputValue }));
  };

  const getIsDisabledDate = current => {
    // Can not select days after today
    return current && current > initialDate();
  };

  const selectedPickerStyle = dateType => {
    // user feedback, a green outline when a date type selected
    return changedDateType === dateType ? { outline: '2px solid green' } : undefined;
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('dtsSummaryPage:FETCH_DATA')} key="1">
            <Space direction="vertical">
              <Space>
                <DatePicker
                  value={monthDate}
                  picker="month"
                  disabledDate={getIsDisabledDate}
                  format="MM/YYYY"
                  placeholder={t('dtsSummaryPage:MONTH')}
                  onChange={handleMonthChange}
                  onBlur={() => setChangedDateType(DATE_TYPES.MONTH)}
                  allowClear={false}
                  style={selectedPickerStyle(DATE_TYPES.MONTH)}
                />
                <RangePicker
                  format="DD/MM/YYYY"
                  value={monthDateRange}
                  disabledDate={getIsDisabledDate}
                  onChange={handleDateRangeChange}
                  onBlur={() => setChangedDateType(DATE_TYPES.RANGE)}
                  style={selectedPickerStyle(DATE_TYPES.RANGE)}
                />
                <DatePicker
                  disabledDate={getIsDisabledDate}
                  format="DD/MM/YYYY"
                  value={dayDate}
                  placeholder={t('dtsSummaryPage:DAY')}
                  onChange={handleDayDateChange}
                  onBlur={() => setChangedDateType(DATE_TYPES.DAY)}
                  allowClear={false}
                  style={selectedPickerStyle(DATE_TYPES.DAY)}
                />
              </Space>
              <Space direction="vertical">
                <Text>{t('FRANCHISE')}</Text>
                <Select
                  value={franchiseId}
                  placeholder={t('FRANCHISE')}
                  onChange={handleFranchiseSelect}
                  className={classes.filterItem}
                  showArrow
                  allowClear
                >
                  {franchiseList}
                </Select>
              </Space>
              <Button
                type="primary"
                onClick={handleFetchButtonClick}
              >
                {t('dtsSummaryPage:FETCH_DATA')}
              </Button>
            </Space>
          </Panel>
        </Collapse>
      </Col>
      <Col span={24}>
        <Collapse defaultActiveKey={['2']}>
          <Panel header={t('FILTER')} key="2">
            <Space size="large" direction="vertical">
              <Space direction="vertical">
                <Space direction="vertical" className={classes.dateWrapper}>
                  <Space direction="vertical">
                    <Space direction="horizontal" className={classes.selectButtonContainer}>
                      <Text>{t('CITY')}</Text>
                      <Space size="middle">
                        <Button
                          id="all"
                          size="small"
                          onClick={handleSelectAllCitiesButton}
                          type="button"
                        >
                          {t('dtsSummaryPage:SELECT_ALL')}
                        </Button>
                        <Button
                          id="reset"
                          size="small"
                          onClick={handleResetButtonClick}
                          type="button"
                        >
                          {t('dtsSummaryPage:RESET')}
                        </Button>
                      </Space>
                    </Space>
                    <Select
                      value={citiesState}
                      mode="multiple"
                      placeholder={t('CITY')}
                      onChange={handleCityChange}
                      className={classes.filterItem}
                      showArrow={false}
                    >
                      {cityList}
                    </Select>
                  </Space>
                </Space>
                <Space className={classes.filterWrapper}>
                  <Space direction="vertical">
                    <Space direction="horizontal" className={classes.domainTypeSpace}>
                      <Text>{t('global:DOMAIN_TYPE')}</Text>
                      <Radio.Group onChange={handleDomainFilterTypeChange} value={domainFilterTypeState}>
                        <Radio value={DOMAIN_FILTER_TYPES.EXACT}>{t(`global:${DOMAIN_FILTER_TYPES.EXACT}`)}</Radio>
                        <Radio value={DOMAIN_FILTER_TYPES.INCLUDES}>{t(`global:${DOMAIN_FILTER_TYPES.INCLUDES}`)}</Radio>
                      </Radio.Group>
                    </Space>
                    <Select
                      value={domainTypeState}
                      mode="tags"
                      placeholder={t('global:DOMAIN_TYPE')}
                      onChange={handleDomainTypeChange}
                      showArrow={false}
                      className={classes.filterItem}
                    >
                      {domainTypeList}
                    </Select>
                  </Space>
                  <Space direction="vertical">
                    <Text>{t('dtsSummaryPage:WAREHOUSE_TYPE')}</Text>
                    <Select
                      value={warehouseTypeState}
                      mode="multiple"
                      placeholder={t('dtsSummaryPage:WAREHOUSE_TYPE')}
                      onChange={handleWarehouseTypeChange}
                      showArrow={false}
                      className={classes.filterItem}
                    >
                      {warehouseTypesList}
                    </Select>
                  </Space>
                </Space>
                <Space direction="vertical" className={classes.filterItem}>
                  <Text>{t('SEARCH')}</Text>
                  <Search
                    placeholder={t('NAME')}
                    onSearch={onSearchInputSubmit}
                    enterButton
                    className={classes.searchInput}
                  />
                </Space>
                <Button
                  type="primary"
                  onClick={handleActionButtonClick}
                >
                  {t('dtsSummaryPage:FILTER')}
                </Button>
              </Space>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

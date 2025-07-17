import { Button, Select } from 'antd';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { availableDomainTypesForCountrySelector, operationalCountriesSelector as countriesSelector, getCitiesSelector } from '@shared/redux/selectors/common';
import { getirDomainTypes, getirMarketShortcutDomainTypes } from '@shared/shared/constantValues';
import { getSelectFilterOption, isCountryInDivision } from '@shared/utils/common';
import { usePrevious } from '@shared/hooks';

import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { filtersSelector, getSelectedDivisionSelector } from '../../redux/selectors';
import { POLYGON_TYPES_FOR_LIVEMAP } from '../../utils';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '../../mixPanelEvents';

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['getirMarketLiveMapPage', 'polygonPage']);
  const [collapsed, setCollapsed] = useState(false);
  const selectedDomainType = useSelector(filtersSelector.getDomainType);
  const selectedCity = useSelector(filtersSelector.getCity);
  const selectedCityData = useSelector(filtersSelector.getSelectedCityData);
  const selectedPolygonType = useSelector(filtersSelector.getPolygonType);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const countries = useSelector(countriesSelector.getData);
  const selectedDivision = useSelector(getSelectedDivisionSelector);
  const selectedFilterCountry = useSelector(filtersSelector.getFilterCountry);
  const previousSelectedCityData = usePrevious(selectedCityData);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);

  useEffect(() => {
    // on country change, set the initial city and map state with first city
    if (cities.length) {
      const defaultCity = cities[0];
      dispatch(Creators.setCity({ city: defaultCity._id }));
    }
  }, [dispatch, cities]);

  useEffect(() => {
    if (selectedCityData) {
      if (selectedCityData?._id !== previousSelectedCityData?._id) {
        const { coordinates, zoomRatio } = selectedCityData.center;
        dispatch(Creators.setMapState({ coordinates, zoomLevel: zoomRatio }));
      }

      if (selectedPolygonType && !isAvailableDomainTypesPending) {
        dispatch(Creators.getPolygonsRequest({ data: { selectedPolygonType, selectedCity: selectedCityData._id } }));
      }
    }
  }, [dispatch, isAvailableDomainTypesPending, previousSelectedCityData?._id, selectedCityData, selectedDomainType, selectedPolygonType]);

  const handlePolygonTypeChange = selectPolygonType => {
    dispatch(Creators.setPolygonType({ polygonType: selectPolygonType }));
    if (!selectPolygonType) {
      dispatch(Creators.resetPolygons());
    }
    AnalyticsService.track(LIVE_MAP_EVENTS.FILTERED, { selected_region: LIVE_MAP_EVENTS.POLYGON_TYPES_BY_ENUM[selectPolygonType] || '' });
  };

  const handleDomainTypeChange = selectDomainType => {
    dispatch(Creators.setDomainType({ domainType: selectDomainType || null }));
    if (selectDomainType && selectedPolygonType) {
      const [, polygonType] = selectedPolygonType.split('-');
      handlePolygonTypeChange(`${selectDomainType}-${polygonType}`);
    }
    AnalyticsService.track(LIVE_MAP_EVENTS.FILTERED, { domain_type: getirDomainTypes[selectDomainType]?.en });
  };

  const handleCityChange = selectCity => {
    dispatch(Creators.setCity({ city: selectCity }));
    const selectedCityName = cities.find(city => city._id === selectCity);
    AnalyticsService.track(LIVE_MAP_EVENTS.FILTERED, { selected_city: selectedCityName.name.en });
  };

  const handleFilterCountryChange = countryId => dispatch(Creators.setFilterCountry({ country: countryId }));

  const domainTypeOptions = useMemo(
    () => {
      const selectableDomainTypes = availableDomainTypes.map(domainType => {
        return {
          value: domainType,
          label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        };
      });
      return selectableDomainTypes;
    },
    [availableDomainTypes, t],
  );

  const divisionCountriesOptions = useMemo(
    () => countries
      .filter(c => isCountryInDivision(c, selectedDivision))
      .map(c => {
        return { value: c._id, label: c.name[getLangKey()] };
      }),
    [countries, selectedDivision],
  );

  const cityOptions = useMemo(
    () => cities.map(city => {
      return { value: city._id, label: city.name[getLangKey()] };
    }),
    [cities],
  );

  const polygonTypeOptions = useMemo(() => {
    const options = [];
    // for each domain type we have polygon type
    POLYGON_TYPES_FOR_LIVEMAP.forEach(pType => {
      GETIR_MARKET_DOMAIN_TYPES.forEach(dType => {
        const label = `${getirMarketShortcutDomainTypes[dType][getLangKey()]} - ${t(`getirMarketLiveMapPage:GETIR_MARKET_POLYGON_TYPES:${pType}`)}`;
        options.push({
          // we need domain type when fetching polygon type, different from page filter
          value: `${dType}-${pType}`,
          label,
          key: label,
          name: `${getirMarketShortcutDomainTypes[dType]?.en} - ${t(`getirMarketLiveMapPage:GETIR_MARKET_POLYGON_TYPES:${pType}`)}`,
        });
      });
    });
    return options;
  }, [t]);

  return (
    <div className={`${classes.filterContainer} ${collapsed ? classes.filterContainerCollapsed : ''}`}>
      <Fragment key="1">
        {selectedDivision && (
          <div>
            <Select
              value={selectedFilterCountry}
              options={divisionCountriesOptions}
              placeholder={t('global:COUNTRY')}
              onChange={handleFilterCountryChange}
              className={classes.eachFilter}
              dropdownClassName={classes.selectDropdown}
              optionFilterProp="label"
              filterOption={getSelectFilterOption}
              showSearch
            />
          </div>
        )}
        <div>
          <Select
            value={selectedCity}
            options={cityOptions}
            placeholder={t('global:CITY')}
            onChange={handleCityChange}
            className={classes.eachFilter}
            dropdownClassName={classes.selectDropdown}
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
            showSearch
          />
        </div>
        <div>
          <Select
            value={selectedDomainType}
            options={domainTypeOptions}
            placeholder={t('global:DOMAIN_TYPE')}
            onChange={handleDomainTypeChange}
            className={classes.eachFilter}
            dropdownClassName={classes.selectDropdown}
            allowClear
          />
        </div>
        <div>
          <Select
            value={selectedPolygonType}
            options={polygonTypeOptions}
            placeholder={t('polygonPage:POLYGON_TYPE')}
            onChange={handlePolygonTypeChange}
            className={classes.eachFilter}
            dropdownClassName={classes.selectDropdown}
            allowClear
          />
        </div>
      </Fragment>

      <Button size="small" key="2" className={classes.collapseButton} onClick={() => setCollapsed(prev => !prev)}>
        {collapsed ? <DownOutlined /> : <UpOutlined />}
      </Button>
    </div>
  );
}

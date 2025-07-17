/* eslint-disable arrow-parens */
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Select } from 'antd';

import SelectTitle from '../selectTitle';
import { Creators } from '../../redux/actions';
import { cityFilterSelector, stateSelector, configFilterSelector } from '../../redux/selectors';
import useStyles from '../../styles';

const { Option } = Select;

const CityFilter = ({ configData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation('onOffPage');

  const cities = useSelector(cityFilterSelector.getCityList);
  const resultData = useSelector(stateSelector.getResultData);
  const selectedCity = useSelector(cityFilterSelector.getSelectedCities);
  const selectedConfig = useSelector(configFilterSelector.getSelectedConfig);

  const setSelectedFilters = (filteredCities, filteredCountries, filteredWarehouses) => {
    const filter = {
      cities: filteredCities,
      countries: filteredCountries,
      warehouses: filteredWarehouses,
    };
    dispatch(Creators.setSelectedCityFilter({ data: filter }));
  };

  const handleChange = value => {
    let selectedCountries = [];
    let filteredWarehouses = [];
    if (value) {
      resultData.map((data) => {
        return data.children.map((child) => {
          if (value?.find((element) => element === child.city)) {
            Object.values(child.children).map((subelement) => {
              filteredWarehouses = [
                ...filteredWarehouses,
                subelement.warehouse,
              ];
              return filteredWarehouses;
            });
            if (selectedCountries.includes(child.country)) {
              selectedCountries = [...selectedCountries];
            }
            else selectedCountries = [...selectedCountries, child.country];
          }
          return selectedCountries;
        });
      });
    }

    const merged = [].concat([], ...filteredWarehouses);

    let selectedValue = value;
    if (value.length === 0) {
      selectedCountries = null;
      selectedValue = null;
    }
    setSelectedFilters(selectedValue, selectedCountries, merged);
  };
  return (
    <div className={classes.cityFilter} data-testid="city-filter">
      <SelectTitle description={t('CITY')} src="city" />
      <Select
        allowClear
        className={classes.filterSelect}
        mode="multiple"
        placeholder={t('CITY_NAME')}
        onChange={handleChange}
        maxTagCount={3}
        maxTagPlaceholder={`+ ${(selectedCity.length) - 3} ${t('CITY')}`}
      >
        {Object.entries(selectedConfig?.length > 0 ? configData : cities).map(([key, value]) => (
          <Option key={key} value={value} label={value} />
        ))}
      </Select>
    </div>
  );
};

export default CityFilter;

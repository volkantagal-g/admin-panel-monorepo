import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import { POLYGON_TYPES_FOR_LIVE_MAP, TEST_ID } from '../../constants';
import useStyle from './styles';

const Filters = () => {
  const { t } = useTranslation(['global']);
  const classes = useStyle();
  const dispatch = useDispatch();

  const filters = useSelector(filtersSelector.getFilters);

  const polygonTypeOptions = useMemo(() => {
    const options = [];
    POLYGON_TYPES_FOR_LIVE_MAP.forEach(polygonType => {
      const label = t(`getirMarketLiveMapPage:GETIR_MARKET_POLYGON_TYPES:${polygonType}`);
      options.push({
        value: polygonType,
        label,
      });
    });
    return options;
  }, [t]);

  const handlePolygonTypeChange = selectedPolygonType => {
    dispatch(Creators.setFilterParams({ filterParams: { polygonType: selectedPolygonType } }));
  };

  return (
    <Select
      value={filters?.polygonType}
      options={polygonTypeOptions}
      filterOption={getSelectFilterOption}
      placeholder={t('global:POLYGON_TYPE')}
      onChange={handlePolygonTypeChange}
      className={classes.polygonTypeSelect}
      dropdownClassName={classes.dropdown}
      data-testid={TEST_ID.FILTERS.SELECT_POLYGON_TYPE}
      id={TEST_ID.FILTERS.SELECT_POLYGON_TYPE}
      allowClear
      showSearch
    />
  );
};

export default Filters;

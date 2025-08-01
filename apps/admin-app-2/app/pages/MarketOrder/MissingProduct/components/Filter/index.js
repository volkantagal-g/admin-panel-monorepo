import { Col, Row } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { debounce } from 'lodash';

import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import useStyles from './styles';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { Select, Space, TextInput } from '@shared/components/GUI';

export const exampleCsv = { id: 'Object Id' };

const DEFAULT_SELECT_MS = 500;

const Filter = () => {
  const { t } = useTranslation('missingProductOrdersPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  const { domainType: selectedDomainType, city: selectedCity } = useSelector(
    filtersSelector.getData,
  );
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);

  const cityOptions = useMemo(() => {
    return cities.map(city => ({
      value: city._id,
      label: city.name[getLangKey()],
    }));
  }, [cities]);

  const domainTypeOptions = useMemo(
    () => GETIR_MARKET_DOMAIN_TYPES.map(value => ({
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${value}`),
      value,
    })),

    [t],
  );

  const handleInputChange = debounce(
    ({ target }) => {
      dispatch(Creators.setSearchTerm({ searchTerm: target.value }));
    },
    [DEFAULT_SELECT_MS],
  );

  return (
    <Space>
      <Row gutter={[6, 6]} data-testid="missing-products-filter">
        <Col sm={8}>
          <Select
            label={t('global:CITY')}
            onChange={value => dispatch(Creators.setSelectedCity({ city: value }))}
            optionsData={cityOptions}
            value={selectedCity}
            filterOption={getSelectFilterOption}
            allowClear
            showSearch
            optionFilterProp="label"
            className={classes.fullWidth}
            loading={isCitiesPending}
            disabled={isCitiesPending}
          />
        </Col>
        <Col sm={8}>
          <Select
            label={t('global:DOMAIN')}
            value={selectedDomainType}
            onChange={domainType => {
              dispatch(Creators.setSelectedDomainType({ domainType }));
            }}
            allowClear
            optionsData={domainTypeOptions}
          />
        </Col>
        <Col span={8}>
          <TextInput label={t('global:SEARCH')} onChange={handleInputChange} />
        </Col>
      </Row>
    </Space>
  );
};

export default Filter;

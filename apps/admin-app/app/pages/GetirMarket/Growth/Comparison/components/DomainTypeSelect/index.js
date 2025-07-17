import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import useStyles from './styles';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

function DomainTypeSelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const filters = useSelector(filtersSelector.getDomainTypes);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));

  const domainTypesSelectOptions = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return { value: tag, label: tagText };
  });

  return (
    <Select
      className={classes.domainTypeSelect}
      value={filters}
      options={domainTypesSelectOptions}
      placeholder={t('global:DOMAIN_TYPE')}
      onChange={handleOnDomainTypeSelectChange}
    />
  );

  function handleOnDomainTypeSelectChange(domainType) {
    dispatch(Creators.setFilters({ params: { domainType } }));
    dispatch(CommonCreators.setSelectedDomainType({ data: domainType }));
  }
}

export default DomainTypeSelect;

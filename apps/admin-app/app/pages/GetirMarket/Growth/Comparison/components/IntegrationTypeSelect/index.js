import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { Creators } from '../../redux/actions';
import { filtersSelector, getActiveIntegrationTypesSetSelector } from '../../redux/selectors';

function IntegrationTypeSelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const filters = useSelector(filtersSelector.getIntegrationTypes);
  const availableIntegrationTypes = useSelector(getActiveIntegrationTypesSetSelector);

  const integrationTypesSelectOptions = Array.from(availableIntegrationTypes).map(tag => {
    const tagText = t(`GETIR_MARKET_INTEGRATION_TYPES.${tag.toUpperCase()}`);
    return { value: tag, label: tagText };
  });

  return (
    <Select
      className="w-100"
      value={filters}
      options={integrationTypesSelectOptions}
      placeholder={t('global:INTEGRATION_TYPE')}
      onChange={handleOnIntegrationTypeSelectChange}
      allowClear
    />
  );

  function handleOnIntegrationTypeSelectChange(integrationType) {
    const newIntegrationType = integrationType !== undefined ? integrationType : null;
    dispatch(Creators.setFilters({ params: { integrationType: newIntegrationType } }));
  }
}

export default IntegrationTypeSelect;

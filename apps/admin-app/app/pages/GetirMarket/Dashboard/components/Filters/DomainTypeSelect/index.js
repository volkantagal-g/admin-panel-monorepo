import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select, Typography } from 'antd';

import AnalyticsService from '@shared/services/analytics';

import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../../redux/actions';
import { filtersSelector } from '../../../redux/selectors';
import useStyles from '../styles';
import { getirDomainTypes } from '@shared/shared/constantValues';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';

const { Text } = Typography;
const { Option } = Select;

const TagOption = (value, text) => {
  return (
    <Option value={value} key={value}>
      <Text>{text}</Text>
    </Option>
  );
};

const DomainTypeSelect = () => {
  const dispatch = useDispatch();
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const { t } = useTranslation('global');
  const classes = useStyles();

  const handleDomainTypeSelect = selectedDomainTypeData => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainTypeData }));
    dispatch(Creators.setSelectedDomainType({ selectedDomainType: selectedDomainTypeData }));
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME,
      { domain_type: getirDomainTypes[selectedDomainTypeData]?.en },
    );
  };

  const domainTypeList = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return TagOption(tag, tagText);
  });

  return (
    <div>
      <Select
        value={selectedDomainType}
        onChange={handleDomainTypeSelect}
        optionFilterProp="label"
        placeholder={t('DOMAIN_TYPE')}
        className={classes.domainTypeSelectInput}
        showArrow
        showSearch
      >
        {domainTypeList}
      </Select>
    </div>
  );
};

export default DomainTypeSelect;

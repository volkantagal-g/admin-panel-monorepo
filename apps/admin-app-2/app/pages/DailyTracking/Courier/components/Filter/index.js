import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Typography,
  Radio,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getLangKey } from '@shared/i18n';
import { DOMAIN_FILTER_TYPES, GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { getCitiesSelector, availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

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

const Filter = ({ requestData }) => {
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const selectedCityFilter = useSelector(filtersSelector.getSelectedCityFilter);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const selectedDomainFilterType = useSelector(filtersSelector.getDomainFilterType);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const { t } = useTranslation(['dailyTrackingPage', 'global']);
  const classes = useStyles();

  const handleDomainTypeChange = domainType => {
    dispatch(Creators.setSelectedDomainType({ selectedDomainType: domainType }));
  };

  const handleDomainFilterTypeChange = e => {
    dispatch(Creators.setDomainFilterType({ domainFilterType: e.target.value }));
  };

  const handleCityChange = cityCode => {
    dispatch(Creators.setSelectedCityFilter({ selectedCityFilter: cityCode }));
    requestData(cityCode);
  };

  const domainTypeList = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return TagOption(tag, tagText);
  });

  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Space direction="vertical" className={classes.dateWrapper}>
                <Space direction="vertical">
                  <Text>{t('CITY')}</Text>
                  <Select
                    value={selectedCityFilter}
                    placeholder={t('CITY')}
                    onChange={handleCityChange}
                    showArrow={false}
                    className={classes.filterItem}
                  >
                    {cityList}
                  </Select>
                </Space>
              </Space>
              <Space className={classes.filterWrapper}>
                <Space direction="vertical">
                  <Space direction="horizontal" className={classes.domainTypeSpace}>
                    <Text>{t('DOMAIN_TYPE')}</Text>
                  </Space>
                  <Select
                    value={selectedDomainType}
                    placeholder={t('DOMAIN_TYPE')}
                    onChange={handleDomainTypeChange}
                    showArrow={false}
                    className={classes.filterItem}
                  >
                    {domainTypeList}
                  </Select>
                  <Space className={classes.domainTypeSpace}>
                    <Text>{t('DOMAIN_FILTER_TYPE')}</Text>
                    <Radio.Group onChange={handleDomainFilterTypeChange} value={selectedDomainFilterType}>
                      <Radio value={DOMAIN_FILTER_TYPES.EXACT}>{t(`${DOMAIN_FILTER_TYPES.EXACT}`)}</Radio>
                      <Radio value={DOMAIN_FILTER_TYPES.INCLUDES}>{t(`${DOMAIN_FILTER_TYPES.INCLUDES}`)}</Radio>
                    </Radio.Group>
                  </Space>
                </Space>
              </Space>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;

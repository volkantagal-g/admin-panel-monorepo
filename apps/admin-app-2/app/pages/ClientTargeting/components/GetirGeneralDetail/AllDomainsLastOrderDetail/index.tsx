import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import LastOrderCalculationTypeSelect from '../../common/LastOrderCalculationTypeSelect';
import MultipleSelect from '../../common/MultipleSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
} from '@shared/shared/constants';

const subSectionName = 'allDomainsLastOrder';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const AllDomainsLastOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const domainTypesList = [
    GETIR_10_DOMAIN_TYPE,
    GETIR_FOOD_DOMAIN_TYPE,
    GETIR_MARKET_DOMAIN_TYPE,
    GETIR_VOYAGER_DOMAIN_TYPE,
    GETIR_LOCALS_DOMAIN_TYPE,
    GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  ].map(tag => {
    const name = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
    const _id = tag;
    return { _id, name };
  });

  return (
    <CollapsePanel
      header={t('ALL_DOMAINS_LAST_ORDER_DETAIL')}
      activeKey={activeKey}
      titleClassName=""
      isParent={false}
      defaultActiveKey={undefined}
    >
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {/* @ts-ignore */}
          <MultipleSelect
            activeKey={activeKey}
            value={data.domainTypes}
            label={t('DOMAIN')}
            clientListKey="domainTypes"
            selectable={domainTypesList}
            placeholder={t('DOMAIN')}
          />
          {/* @ts-ignore */}
          <MultipleSelect
            activeKey={activeKey}
            value={data.cities}
            label={t('global:CITY')}
            clientListKey="cities"
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            isSelectAllCountriesVisible={false}
          />
        </Col>
        <Col span={11}>
          {/* @ts-ignore */}
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LAST_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
            showAllDates={false}
          />
          <LastOrderCalculationTypeSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            value={data.calculationType}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default AllDomainsLastOrderDetail;

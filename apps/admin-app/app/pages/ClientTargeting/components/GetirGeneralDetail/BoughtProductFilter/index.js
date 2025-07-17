import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import CountInputsSelect from '../../common/CountInputsSelect';
import ProductSelect from '../../common/ProductSelect';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirMarketDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'boughtProduct';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const BoughtProductFilter = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('BOUGHT_PRODUCT_FILTER')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirMarketDomainTypesList}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <ProductSelect
            activeKey={activeKey}
          />
          <CountInputsSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            selectedCountType={data.selectedCountType}
            selectedCountMinValue={data.selectedCountMinValue}
            selectedCountMaxValue={data.selectedCountMaxValue}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default BoughtProductFilter;

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, financialTypes, productPriceValueTypes } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ProductSelect from '../../common/ProductSelect';

import MinMaxDecimalInput from '../../common/MinMaxDecimalInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirMarketDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'productPriceDetails';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const ProductPriceDetails = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minValue';
  const maxCountKey = 'maxValue';

  return (
    <CollapsePanel header={t('PRODUCT_PRICE_DETAILS')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirMarketDomainTypesList}
          />
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
        </Col>
        <Col span={11}>
          <ProductSelect
            activeKey={activeKey}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('FINANCIAL_TYPE')}
            clientListKey="financialType"
            value={data.financialType}
            tagValue="name"
            tagKey="type"
            selectable={financialTypes(t)}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('VALUE_TYPE')}
            clientListKey="valueType"
            value={data.valueType}
            tagValue="name"
            tagKey="type"
            selectable={productPriceValueTypes(t)}
          />
          <MinMaxDecimalInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            minLabel={t('MIN_VALUE')}
            maxLabel={t('MAX_VALUE')}
            precision={2}
            min={0.00}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default ProductPriceDetails;

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getGetirFinanceServiceTypeOptions, orderPriceValueTypes } from '../../../constants';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';
import MinMaxDecimalInput from '../../common/MinMaxDecimalInput';

const subSectionName = 'getirMoneySpendingDetail';
const activeKey = `${clientListSections.getirFinanceServiceDetail}.${subSectionName}`;

const GetirMoneySpendingDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minValue';
  const maxCountKey = 'maxValue';
  const getirFinanceServiceTypeOptions = getGetirFinanceServiceTypeOptions();

  return (
    <CollapsePanel header={t('GETIR_MONEY_SPENDING_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.domainTypes}
            label={t('DOMAIN')}
            clientListKey="domainTypes"
            selectable={getirFinanceServiceTypeOptions}
            tagValue="label"
            tagKey="value"
            placeholder={t('DOMAIN')}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('VALUE_TYPE')}
            clientListKey="valueType"
            value={data.valueType}
            tagValue="name"
            tagKey="type"
            selectable={orderPriceValueTypes(t)}
          />
          <MinMaxDecimalInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('global:VALUE')}
            precision={2}
            min={0.00}
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
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default GetirMoneySpendingDetail;

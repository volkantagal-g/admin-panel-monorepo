import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { clientListSections, getGetirSelectServiceTypeOptions, getGetirSelectBenefitTypeOptions } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';

const subSectionName = 'benefitUsage';
const activeKey = `${clientListSections.getirSelectServiceDetail}.${subSectionName}`;

const minCountKey = 'minOrderCount';
const maxCountKey = 'maxOrderCount';

const BenefitUsage = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const getirSelectServiceTypeOptions = getGetirSelectServiceTypeOptions();
  const getirSelectBenefitTypeOptions = getGetirSelectBenefitTypeOptions();

  return (
    <CollapsePanel header={t('GETIR_SELECT_BENEFIT.USAGE')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            selectable={getirSelectServiceTypeOptions}
            tagValue="label"
            tagKey="value"
            value={data.serviceType}
            label={t('DOMAIN')}
            clientListKey="serviceType"
            placeholder={t('DOMAIN')}
            description={t('GETIR_SELECT_BENEFIT.SERVICE_TYPE_DESCRIPTION')}
          />
          <MultipleSelect
            activeKey={activeKey}
            label={t('GETIR_SELECT_BENEFIT.TYPE.TITLE')}
            placeholder={t('GETIR_SELECT_BENEFIT.TYPE.TITLE')}
            clientListKey="benefitType"
            value={data.benefitType}
            selectable={getirSelectBenefitTypeOptions}
            tagValue="label"
            tagKey="value"
            description={t('GETIR_SELECT_BENEFIT.SERVICE_TYPE_DESCRIPTION')}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('ORDER_COUNT')}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('ORDER_DATE_RANGE')}
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

export default BenefitUsage;

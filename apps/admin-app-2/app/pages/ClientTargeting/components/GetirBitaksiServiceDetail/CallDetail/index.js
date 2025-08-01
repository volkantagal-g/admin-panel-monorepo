import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import { getCitiesSelector } from '@shared/redux/selectors/common';

const subSectionName = 'callFrequency';
const activeKey = `${clientListSections.getirBitaksiServiceDetail}.${subSectionName}`;

const CallFrequencyDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCallCount = 'minCallCount';
  const maxCallCount = 'maxCallCount';
  return (
    <CollapsePanel header={t('CALL_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.cities}
            label={t('global:CITY')}
            clientListKey="cities"
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            disabled={data.cityDisabled}
            isSelectAllCountriesVisible={false}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('CALL_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCallCount]}
            maxCount={data[maxCallCount]}
            minCountKey={minCallCount}
            maxCountKey={maxCallCount}
            label={t('CALL_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default CallFrequencyDetail;

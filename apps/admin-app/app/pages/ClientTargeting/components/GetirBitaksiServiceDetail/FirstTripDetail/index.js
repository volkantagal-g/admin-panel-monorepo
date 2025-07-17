import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import FirstTripCalculationTypeSelect from '../../common/FirstTripCalculationTypeSelect';

const subSectionName = 'firstOrder';
const activeKey = `${clientListSections.getirBitaksiServiceDetail}.${subSectionName}`;

const FirstTripDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GBT_FIRST_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && (
            <div>
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
            </div>
          )}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('FIRST_TRIP_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <FirstTripCalculationTypeSelect
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

export default FirstTripDetail;

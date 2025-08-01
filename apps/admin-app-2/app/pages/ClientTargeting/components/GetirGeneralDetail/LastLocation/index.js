import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SwitchInput from '../../common/SwitchInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';

const subSectionName = 'lastLocation';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const LastLocation = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('LAST_LOCATION_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && (
            <div>
              <WarehouseBundleFilter
                activeKey={activeKey}
              />
            </div>
          )}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
        </Col>
        <Col span={11}>
          <SwitchInput
            activeKey={activeKey}
            label={t('IN_ONLY_COVERAGE_AREA_CLIENTS')}
            value={data.inOnlyCoverage}
            clientListKey="inOnlyCoverage"
          />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LAST_LOCATION_DATE_RANGE')}
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

export default LastLocation;

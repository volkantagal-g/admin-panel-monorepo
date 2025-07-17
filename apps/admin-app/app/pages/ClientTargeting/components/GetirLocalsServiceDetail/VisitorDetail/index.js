import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import ShopsSelect from '../../common/ShopsSelect';
import MultipleSelect from '../../common/MultipleSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';

const subSectionName = 'visitor';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const VisitorDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GETIR_LOCALS_TAB_OPEN_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            label={t('global:CITY')}
            clientListKey="cities"
            value={data.cities}
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            disabled={data.cityDisabled}
            filterableData={{ shops: data.getShops.data }}
            key="CITY_SELECT"
          />
          <ShopsSelect
            activeKey={activeKey}
            value={data.shops}
            label={t('STORES')}
            clientListKey="shops"
            selectable={data.getShops.data}
            selectedCityIds={data.cities}
            isLoading={data.getShops.isPending}
            showCSVImporter
          />
          <GeoJsonUploader
            activeKey={activeKey}
            value={data.geoJson}
            key={activeIndex}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LAST_VISIT')}
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

export default VisitorDetail;

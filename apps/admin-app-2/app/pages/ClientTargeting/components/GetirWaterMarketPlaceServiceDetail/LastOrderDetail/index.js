import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData, getGwmpBrandsSelector } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import MultipleSelect from '../../common/MultipleSelect';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import LastOrderCalculationTypeSelect from '../../common/LastOrderCalculationTypeSelect';
import VendorSelect from '../../common/VendorSelect';

const subSectionName = 'lastOrder';
const activeKey = `${clientListSections.getirWaterMarketPlaceServiceDetail}.${subSectionName}`;

const LastOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);
  const brands = useSelector(getGwmpBrandsSelector.getData);
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GWMP_LAST_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && (
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
          )}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
          <MultipleSelect
            activeKey={activeKey}
            value={data.brands}
            label={t('global:BRAND')}
            clientListKey="brands"
            selectable={brands}
            tagKey="id"
            tagValue="brandName"
            placeholder={t('global:BRAND')}
          />
          <VendorSelect
            activeKey={activeKey}
            value={data.vendors}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LAST_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
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

export default LastOrderDetail;

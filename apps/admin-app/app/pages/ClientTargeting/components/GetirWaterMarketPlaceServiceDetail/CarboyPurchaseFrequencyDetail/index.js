import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, carboyPurchaseFrequencyCountTypes } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData, getGwmpBrandsSelector } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import MinMaxInput from '../../common/MinMaxInput';
import VendorSelect from '../../common/VendorSelect';

const subSectionName = 'carboyPurchaseFrequency';
const activeKey = `${clientListSections.getirWaterMarketPlaceServiceDetail}.${subSectionName}`;

const CarboyPurchaseFrequencyDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);
  const brands = useSelector(getGwmpBrandsSelector.getData);
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  const minCountKey = 'selectedCountMinValue';
  const maxCountKey = 'selectedCountMaxValue';

  return (
    <CollapsePanel header={t('GWMP_CARBOY_PURCHASE_FREQUENCY_DETAIL')} activeKey={activeKey}>
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
            label={t('ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            clientListKey="selectedCountType"
            value={data.selectedCountType}
            selectable={carboyPurchaseFrequencyCountTypes(t)}
            tagValue="name"
            tagKey="_id"
            allowClear
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
      </Row>
    </CollapsePanel>
  );
};

export default CarboyPurchaseFrequencyDetail;

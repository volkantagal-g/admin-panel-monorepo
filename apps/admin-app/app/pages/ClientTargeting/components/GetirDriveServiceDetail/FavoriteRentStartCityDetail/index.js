import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MultipleSelect from '../../common/MultipleSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import {
  clientListSections,
  getGetirDriveRentStatusOptions,
  getGetirDrivePaymentTypeOptions,
  GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS,
} from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import HourSelect from '../../common/HourSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';

const subSectionName = 'favoriteRentStartCity';
const activeKey = `${clientListSections.getirDriveServiceDetail}.${subSectionName}`;

const FavoriteRentStartCityDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const getirDriveRentStatusOptions = getGetirDriveRentStatusOptions(t);
  const getirDrivePaymentTypeOptions = getGetirDrivePaymentTypeOptions(t);

  return (
    <CollapsePanel header={t('GETIR_DRIVE_FAVORITE_RENT_START_CITY_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.externalSource}
            label={t('SOURCE')}
            clientListKey="externalSource"
            selectable={GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS}
            placeholder={t('SOURCE')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.cities}
            label={t('GETIR_DRIVE_FAVORITE_RENT_START_CITY')}
            clientListKey="cities"
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            disabled={data.cityDisabled}
            isSelectAllCountriesCheckboxDisabled
            isSelectAllCountriesVisible={false}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.state}
            label={t('RENT_STATUS')}
            clientListKey="state"
            selectable={getirDriveRentStatusOptions}
            placeholder={t('RENT_STATUS')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.paymentType}
            label={t('PAYMENT_TYPE')}
            clientListKey="paymentType"
            selectable={getirDrivePaymentTypeOptions}
            placeholder={t('PAYMENT_TYPE')}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('RENT_DATE_INTERVAL')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <HourSelect
            value={data.hourIntervals}
            activeKey={activeKey}
            label={t('GETIR_DRIVE_HOUR_INTERVAL')}
            placeholder={t('GETIR_DRIVE_HOUR_INTERVAL')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default FavoriteRentStartCityDetail;

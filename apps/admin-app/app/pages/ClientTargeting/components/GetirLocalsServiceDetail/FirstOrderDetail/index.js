import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';

import ShopsSelect from '../../common/ShopsSelect';
import FirstOrderCalculationTypeSelect from '../../common/FirstOrderCalculationTypeSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';

const subSectionName = 'firstOrder';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const FirstOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GETIR_LOCALS_FIRST_ORDER_DETAIL')} activeKey={activeKey}>
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
            isSelectAllCountriesVisible={false}
          />
          <ArtisanTypesSelect
            activeKey={activeKey}
            label={t('ARTISAN_TYPE')}
            placeholder={t('ARTISAN_TYPE')}
            clientListKey="artisanType"
            value={data.artisanType}
          />
          <ArtisanChainShopsSelect
            activeKey={activeKey}
            label={t('ARTISAN_CHAIN_SHOPS')}
            placeholder={t('ARTISAN_CHAIN_SHOPS')}
            clientListKey="chainId"
            value={data.chainId}
          />
          <ShopsSelect
            activeKey={activeKey}
            value={data.shops}
            label={t('STORES')}
            clientListKey="shops"
            selectable={data.getShops.data}
            selectedArtisanType={data.artisanType}
            selectedChainId={data.chainId}
            isLoading={data.getShops.isPending}
            showCSVImporter
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
          <FirstOrderCalculationTypeSelect
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

export default FirstOrderDetail;

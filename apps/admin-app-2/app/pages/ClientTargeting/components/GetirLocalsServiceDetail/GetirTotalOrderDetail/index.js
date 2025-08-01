import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';

import { Creators } from '../../../redux/actions';
import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';
import ShopsSelect from '../../common/ShopsSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import SelectDateOrXDaysBeforeToday from '@app/pages/ClientTargeting/components/common/SelectDateOrXDaysBeforeToday';

const subSectionName = 'totalOrder';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const GetirTotalOrderDetail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const storeCalculationTypes = [
    { key: 1, value: t('GETIR_LOCALS_STORE_CALCULATION_TYPES.TOTAL_ORDER_COUNT') },
    { key: 2, value: t('GETIR_LOCALS_STORE_CALCULATION_TYPES.ORDER_COUNT_PER_STORE') },
  ];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  const handleIgnoreChainChanged = () => {
    dispatch(Creators.setInput({ activeKey, clientListKey: 'chainId', value: null }));
    dispatch(Creators.setInput({ activeKey, clientListKey: 'shops', value: [] }));
    dispatch(Creators.setInput({ activeKey, clientListKey: 'getShops', value: { data: [], isPending: true, error: null } }));
  };

  return (
    <CollapsePanel header={t('GETIR_LOCALS_ORDER_DETAIL')} activeKey={activeKey}>
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
            filterableData={{ shops: data.getShops.data }}
            disabled={data.cityDisabled}
            key="CITY_SELECT"
          />
          <ArtisanTypesSelect
            activeKey={activeKey}
            label={t('ARTISAN_TYPE')}
            placeholder={t('ARTISAN_TYPE')}
            clientListKey="artisanType"
            value={data.artisanType}
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('SELECT_ALL_CHAINS')}
            value={data.ignoreChain}
            clientListKey="ignoreChain"
            onChange={handleIgnoreChainChanged}
          />
          <ArtisanChainShopsSelect
            activeKey={activeKey}
            label={t('ARTISAN_CHAIN_SHOPS')}
            placeholder={t('ARTISAN_CHAIN_SHOPS')}
            clientListKey="chainId"
            value={data.chainId}
            disabled={data.ignoreChain}
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
            disabled={data.ignoreChain}
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
            clientListKey="storeCalculationDetail"
            value={data.storeCalculationDetail}
            selectable={storeCalculationTypes}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('ORDER_COUNT')}
            descriptionV2={t('ORDER_COUNT_MIN_MAX_DESC')}
            canBeRemoveMax
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default GetirTotalOrderDetail;

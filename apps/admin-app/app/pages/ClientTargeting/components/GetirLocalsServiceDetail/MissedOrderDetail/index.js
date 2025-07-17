import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MinMaxInput from '../../common/MinMaxInput';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import ShopsSelect from '../../common/ShopsSelect';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';

const subSectionName = 'missedOrder';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const MissedOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  return (
    <CollapsePanel header={t('GETIR_LOCALS_MISSED_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
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
            label={t('MISSED_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('MISSED_ORDER_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default MissedOrderDetail;

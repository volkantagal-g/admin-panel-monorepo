import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Tooltip } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';

import CollapsePanel from '../../common/CollapsePanel';
import {
  clientListSections,
  financialTypes,
  orderPriceValueTypes,
  getOrderPriceDetailTopXOrderTypeOptions,
  getOrderCalculationTypes,
} from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import ShopsSelect from '../../common/ShopsSelect';
import MinMaxDecimalInput from '../../common/MinMaxDecimalInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'orderPrice';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const OrderPriceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  const isCPFinancialTypeSelected = data?.financialType === 'cpVatIncluded' || data?.financialType === 'cpVatExcluded';

  const minCountKey = 'minValue';
  const maxCountKey = 'maxValue';

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  const topXOrderTypeOptions = getOrderPriceDetailTopXOrderTypeOptions(t);
  const orderCalculationOptions = getOrderCalculationTypes(t);

  return (
    <CollapsePanel header={t('ORDER_PRICE_DETAILS')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirDomainTypesList}
          />
          {data.domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) && (
            <div>
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
                showCSVImporter
                selectedArtisanType={data.artisanType}
                selectedChainId={data.chainId}
              />
            </div>
          )}
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('TOP_X_ORDER_TYPE')}
            placeholder={t('TOP_X_ORDER_TYPE')}
            value={data.topXOrderType}
            selectable={topXOrderTypeOptions}
            clientListKey="topXOrderType"
            tagValue="label"
            tagKey="value"
            allowClear
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            value={data.calculationType}
            selectable={orderCalculationOptions}
            clientListKey="calculationType"
            tagValue="label"
            tagKey="value"
            allowClear
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minOrderKey]}
            maxCount={data[maxOrderKey]}
            minCountKey={minOrderKey}
            maxCountKey={maxOrderKey}
            label={`${t('ORDER_COUNT')} (X)`}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('FINANCIAL_TYPE')}
            clientListKey="financialType"
            value={data.financialType}
            tagValue="name"
            tagKey="type"
            selectable={financialTypes(t)}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('VALUE_TYPE')}
            clientListKey="valueType"
            value={data.valueType}
            tagValue="name"
            tagKey="type"
            selectable={orderPriceValueTypes(t)}
          />
          <MinMaxDecimalInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={
              !isCPFinancialTypeSelected ? t('global:VALUE') : (
                <>
                  {t('global:VALUE')}
                  <Tooltip title={t('ALLOW_NEGATIVE_VALUE')}>
                    <InfoCircleOutlined />
                  </Tooltip>
                </>
              )
            }
            precision={2}
            min={!isCPFinancialTypeSelected ? 0 : undefined}
            onKeyDownAllowedNegative={isCPFinancialTypeSelected}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default OrderPriceDetail;

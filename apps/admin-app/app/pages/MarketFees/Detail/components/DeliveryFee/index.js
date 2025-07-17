import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { feeDetailsSelector } from '../../redux/selectors';
import {
  getirDomainTypesAllShortcuts,
  domainTypes as getirDomainTypesAll,
} from '@shared/shared/constantValues';
import DeliveryFeeTabDetails from './components/DeliveryFeeTabDetails';
import { Card, Tabs } from '@shared/components/GUI';

const DeliveryFeeConfig = () => {
  const { t } = useTranslation('feeDetailsPage');

  const { fee = {}, warehouse = {} } =
    useSelector(feeDetailsSelector.getData) || {};
  const { domainTypes, _id: warehouseId } = warehouse;

  const domainSpecificDetails = useMemo(
    () => fee?.domainSpecificDetails || [],
    [fee],
  );

  const domainSpecificDetailsMap = domainSpecificDetails?.reduce(
    (map, feesObj = {}) => {
      const { feeDetails, domainType } = feesObj;
      return {
        ...map,
        [domainType]: feeDetails?.deliveryFee,
      };
    },
    {},
  );

  const domainConfigTabs = useMemo(() => {
    return domainTypes?.map((domain, idx) => ({
      key: (idx + 1).toString(),
      label: getirDomainTypesAllShortcuts?.[domain]?.[getLangKey()],
      title: getirDomainTypesAll?.[domain]?.[getLangKey()],
      children: (
        <DeliveryFeeTabDetails
          feeDetails={domainSpecificDetailsMap?.[domain]}
          domainType={domain}
          warehouseId={warehouseId}
        />
      ),
    }));
  }, [domainSpecificDetailsMap, warehouseId, domainTypes]);

  return (
    <Card
      title={t('DELIVERY_FEE.CONFIG.TITLE')}
      data-testid="delivery-fee-config"
    >
      <Tabs items={domainConfigTabs} tabPosition="top" />
    </Card>
  );
};

export default DeliveryFeeConfig;

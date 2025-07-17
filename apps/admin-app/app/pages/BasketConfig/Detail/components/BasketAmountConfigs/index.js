import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { basketAmountDetailsSelector } from '../../redux/selectors';
import {
  getirDomainTypesAllShortcuts,
  domainTypes as getirDomainTypesAll,
} from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import DomainSpecificConfigs from './DomainSpecificConfig';
import { Tabs } from '@shared/components/GUI';

const BasketAmountConfigs = () => {
  const { basketAmounts = {}, warehouse = {} } =
    useSelector(basketAmountDetailsSelector.getData) || {};

  const { _id: warehouseId, domainTypes } = warehouse;

  const domainSpecificDetailsMap = basketAmounts?.domainSpecificDetails?.reduce(
    (map, amountConfig = {}) => {
      const {
        minDiscountedAmount,
        maxDiscountedAmount,
        domainType,
        zoneBasedBasketAmounts,
        basketAmountSource,
      } = amountConfig;
      return {
        ...map,
        [domainType]: {
          maxDiscountedAmount,
          minDiscountedAmount,
          basketAmountSource,
          zoneOneMinDiscountedAmount:
            zoneBasedBasketAmounts?.[1]?.minDiscountedAmount,
          zoneOneMaxDiscountedAmount:
            zoneBasedBasketAmounts?.[1]?.maxDiscountedAmount,
          zoneTwoMinDiscountedAmount:
            zoneBasedBasketAmounts?.[2]?.minDiscountedAmount,
          zoneTwoMaxDiscountedAmount:
            zoneBasedBasketAmounts?.[2]?.maxDiscountedAmount,
          zoneThreeMinDiscountedAmount:
            zoneBasedBasketAmounts?.[3]?.minDiscountedAmount,
          zoneThreeMaxDiscountedAmount:
            zoneBasedBasketAmounts?.[3]?.maxDiscountedAmount,
        },
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
        <DomainSpecificConfigs
          domainSpecificDetails={domainSpecificDetailsMap?.[domain]}
          warehouseId={warehouseId}
          warehouseDomainType={domain}
        />
      ),
    }));
  }, [domainTypes, warehouseId, domainSpecificDetailsMap]);

  return (
    <Tabs
      data-testid="basket-amount-configs"
      items={domainConfigTabs}
      tabPosition="top"
    />
  );
};
export default BasketAmountConfigs;

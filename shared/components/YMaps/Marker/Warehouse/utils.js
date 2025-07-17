import { get } from 'lodash';

import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { warehouseMarkersByDomainTypeByStatus } from './constants';

export const getWarehouseMarkerIcon = ({ warehouse }) => {
  const warehouseDomainTypes = get(warehouse, 'domainTypes', []);
  const isServingG10 = warehouseDomainTypes.includes(GETIR_DOMAIN_TYPES.GETIR10);
  const isServingG30 = warehouseDomainTypes.includes(GETIR_DOMAIN_TYPES.MARKET);
  const isServingVoyager = warehouseDomainTypes.includes(GETIR_DOMAIN_TYPES.VOYAGER);
  let warehouseDomainTypeForIcon = GETIR_DOMAIN_TYPES.GETIR10;

  if (isServingG10 && isServingG30) {
    warehouseDomainTypeForIcon = 'MERGED';
  }
  else if (isServingG10) {
    warehouseDomainTypeForIcon = GETIR_DOMAIN_TYPES.GETIR10;
  }
  else if (isServingG30) {
    warehouseDomainTypeForIcon = GETIR_DOMAIN_TYPES.MARKET;
  }
  else if (isServingVoyager) {
    warehouseDomainTypeForIcon = GETIR_DOMAIN_TYPES.VOYAGER;
  }

  return get(warehouseMarkersByDomainTypeByStatus, [warehouseDomainTypeForIcon, warehouse.status]);
};

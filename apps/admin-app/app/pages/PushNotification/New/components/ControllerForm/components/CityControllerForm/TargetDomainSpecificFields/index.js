import { Col } from 'antd';

import RestaurantTarget from
  '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/RestaurantTarget/index';
import WarehouseTarget from
  '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/WarehouseTarget/index';

import ArtisanTarget
  from '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/ArtisanTarget';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';

const TargetDomainSpecificFields = ({
  domainType,
  notificationType,
  promoId, controls,
  form, warehousesFormName,
  restaurantsFormName, artisansFormName, cityFieldName,
}) => {
  const hasWarehouseList = [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE];
  const hasRestaurantList = [GETIR_FOOD_DOMAIN_TYPE];
  const hasArtisanList = [GETIR_LOCALS_DOMAIN_TYPE];
  const chain = controls?.locationBasedControl?.restaurants?.chain;
  return (
    <Col lg={24} xs={24}>
      {hasWarehouseList.includes(domainType) && (
        <WarehouseTarget
          cityFieldName={cityFieldName}
          form={form}
          warehousesFormName={warehousesFormName}
        />
      )}
      {hasRestaurantList.includes(domainType) && (
        <RestaurantTarget
          restaurantsFormName={restaurantsFormName}
          chain={chain}
          promoId={promoId}
          form={form}
          notificationType={notificationType}
          domainType={domainType}
        />
      )}

      {hasArtisanList.includes(domainType) && (
        <ArtisanTarget
          form={form}
          artisansFormName={artisansFormName}
          domainType={domainType}
        />
      )}
    </Col>
  );
};

export default TargetDomainSpecificFields;

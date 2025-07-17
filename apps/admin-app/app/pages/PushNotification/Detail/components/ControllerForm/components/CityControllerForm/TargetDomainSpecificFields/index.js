import { Col } from 'antd';

import RestaurantTarget from
  '@app/pages/PushNotification/Detail/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/RestaurantTarget/index';
import WarehouseTarget from
  '@app/pages/PushNotification/Detail/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/WarehouseTarget/index';
import ArtisanTarget
  from '@app/pages/PushNotification/Detail/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/ArtisanTarget';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';

const TargetDomainSpecificFields = ({
  domainType,
  notificationType, promoId, controls, form, warehousesFormName, restaurantsFormName, isFormEditable, cityFieldName, artisansFormName,
}) => {
  const hasWarehouseList = [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE];
  const hasRestaurantList = [GETIR_FOOD_DOMAIN_TYPE];
  const cities = controls?.locationBasedControl?.targetCities;
  const chain = controls?.locationBasedControl?.restaurants?.chain;
  const hasArtisanList = [GETIR_LOCALS_DOMAIN_TYPE];
  return (
    <Col lg={24} xs={24}>
      {hasWarehouseList.includes(domainType) && (
        <WarehouseTarget
          form={form}
          cityFieldName={cityFieldName}
          warehousesFormName={warehousesFormName}
          targetCities={cities}
          notificationType={notificationType}
          isFormEditable={isFormEditable}
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
          isFormEditable={isFormEditable}
        />
      )}
      {hasArtisanList.includes(domainType) && (
        <ArtisanTarget
          form={form}
          isFormEditable={isFormEditable}
          artisansFormName={artisansFormName}
          domainType={domainType}
        />
      )}

    </Col>
  );
};

export default TargetDomainSpecificFields;

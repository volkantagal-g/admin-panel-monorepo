import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Card } from 'antd';

import { rules } from '@shared/utils/marketing/formUtils';
import CitySelect from '@shared/containers/Marketing/Select/CitySelect';
import TargetDomainSpecificFields
  from '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/index';

const CityControllerForm = ({ form, controlFormName }) => {
  const { t } = useTranslation('marketing');

  const citiesFormName = [...controlFormName, 'locationBasedControl', 'targetCities'];
  const warehousesFormName = [...controlFormName, 'locationBasedControl', 'targetWarehouses'];
  const restaurantsFormName = [...controlFormName, 'locationBasedControl', 'restaurants'];
  const chainFormName = [...controlFormName, 'locationBasedControl', 'restaurants', 'chain'];
  const artisansFormName = [...controlFormName, 'locationBasedControl', 'merchants'];

  return (
    <Card size="small" title={t('LOCATION_BASED_CONTROLS')}>
      <Row gutter={24}>
        <CitySelect fieldName={citiesFormName} rule={rules.onlyRequired} form={form} removeAll={false} selectAll={false} />
      </Row>

      <Row gutter={24}>
        <Form.Item noStyle dependencies={['domainType', 'notificationType', 'promoId', citiesFormName, chainFormName]}>
          {({ getFieldsValue }) => {
            const fields = getFieldsValue(['domainType', 'notificationType', 'promoId', controlFormName]);
            return (
              <TargetDomainSpecificFields
                {...fields}
                form={form}
                cityFieldName={citiesFormName}
                warehousesFormName={warehousesFormName}
                restaurantsFormName={restaurantsFormName}
                artisansFormName={artisansFormName}
              />
            );
          }}
        </Form.Item>
      </Row>
    </Card>
  );
};

export default memo(CityControllerForm);

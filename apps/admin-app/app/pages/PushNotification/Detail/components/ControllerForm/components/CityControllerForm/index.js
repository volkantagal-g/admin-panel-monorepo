import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Card } from 'antd';
import { useDispatch } from 'react-redux';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { rules } from '@shared/utils/marketing/formUtils';

import TargetDomainSpecificFields
  from '@app/pages/PushNotification/Detail/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/index';
import CitySelect from '@shared/containers/Marketing/Select/CitySelect';

const CityControllerForm = ({ form, controlFormName, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const citiesFormName = [...controlFormName, 'locationBasedControl', 'targetCities'];
  const warehousesFormName = [...controlFormName, 'locationBasedControl', 'targetWarehouses'];
  const restaurantsFormName = [...controlFormName, 'locationBasedControl', 'restaurants'];
  const chainFormName = [...controlFormName, 'locationBasedControl', 'restaurants', 'chain'];
  const artisansFormName = [...controlFormName, 'locationBasedControl', 'merchants'];

  useEffect(() => {
    const targetCountry = form.getFieldValue('targetCountry');
    dispatch(CommonCreators.getCitiesRequest({ countryId: targetCountry.value }));
  }, [dispatch, form]);

  return (
    <Card size="small" title={t('LOCATION_BASED_CONTROLS')}>
      <Row gutter={24}>
        <CitySelect fieldName={citiesFormName} rule={rules.onlyRequired} form={form} removeAll={false} selectAll={false} disabled={!isFormEditable} />
      </Row>

      <Row gutter={24}>
        <Form.Item noStyle dependencies={['domainType', 'notificationType', 'promoId', citiesFormName, chainFormName]}>
          {({ getFieldsValue }) => {
            const fields = getFieldsValue(['domainType', 'notificationType', 'promoId', controlFormName]);
            return (
              <TargetDomainSpecificFields
                cityFieldName={citiesFormName}
                {...fields}
                form={form}
                warehousesFormName={warehousesFormName}
                restaurantsFormName={restaurantsFormName}
                artisansFormName={artisansFormName}
                isFormEditable={isFormEditable}
              />
            );
          }}
        </Form.Item>
      </Row>
    </Card>
  );
};

export default memo(CityControllerForm);

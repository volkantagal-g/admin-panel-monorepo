import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Card, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import CitySelect from '@shared/containers/Marketing/Select/CitySelect';
import WarehouseSelect from '@shared/containers/Marketing/Select/WarehouseSelect';
import {
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
} from '@shared/shared/constants';

const CityAndWareHouseControl = ({ form, parentFieldName, domainTypes, disabled }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const citiesFormName = [...[parentFieldName], 'cityAndWarehouseControl', 'targetCities'];
  const warehousesFormName = [...[parentFieldName], 'cityAndWarehouseControl', 'targetWarehouses'];

  useEffect(() => {
    const countryId = getSelectedCountry()?._id;
    dispatch(CommonCreators.getCitiesRequest({ countryId }));
  }, [dispatch]);

  return (
    <Card size="small" title={t('LOCATION_BASED_CONTROLS')} aria-label={t('LOCATION_BASED_CONTROLS')} role="rowheader">
      <Row gutter={24}>
        <CitySelect
          fieldName={citiesFormName}
          rules={[{ required: true, message: t('error:REQUIRED') }]}
          form={form}
          disabled={disabled}
          onSelectAll={cities => dispatch(CommonCreators.getFilteredWarehousesRequest({ cities, fields: 'name' }))}
          onReset={() => form.setFields([{ name: warehousesFormName, value: [] }])}
        />
      </Row>

      <Row gutter={24}>
        <Form.Item noStyle dependencies={[citiesFormName]}>
          {({ getFieldValue }) => {
            const inappropriateDomainTypes = [GETIR_FOOD_DOMAIN_TYPE,
              GETIR_LOCALS_DOMAIN_TYPE, GETIR_BITAKSI_DOMAIN_TYPE, GETIR_WATER_MARKETPLACE_DOMAIN_TYPE, GETIR_JOB_DOMAIN_TYPE, GETIR_DRIVE_DOMAIN_TYPE];
            if (domainTypes && domainTypes.length > 0) {
              if (!domainTypes.some(domainType => inappropriateDomainTypes.includes(domainType))) {
                const cities = getFieldValue(citiesFormName);
                return (
                  <WarehouseSelect
                    fieldName={warehousesFormName}
                    form={form}
                    cities={cities}
                    disabled={disabled}
                  />
                );
              }
            }
            return null;
          }}
        </Form.Item>
      </Row>
    </Card>
  );
};

export default memo(CityAndWareHouseControl);

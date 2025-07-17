import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Row, Form } from 'antd';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AntCard from '@shared/components/UI/AntCard';
import CitySelect from '@shared/containers/Marketing/Select/CitySelect';
import WarehouseSelect from '@shared/containers/Marketing/Select/WarehouseSelect';

const OptionalControlForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  return (
    <AntCard footer={false} bordered={false} title={t('CONTROLS')}>

      <Row gutter={24}>
        <CitySelect
          onReset={() => form.setFieldsValue({ warehouses: [] })}
          disabled={!isFormEditable}
          fieldName="cities"
          form={form}
          onSelectAll={cities => dispatch(CommonCreators.getFilteredWarehousesRequest({ cities, fields: 'name' }))}
        />
      </Row>

      <Row gutter={24}>
        <Form.Item noStyle dependencies={['cities']} label={t('APP_LANGUAGES_TITLE')}>
          {({ getFieldValue }) => {
            const cities = getFieldValue('cities');
            return (
              <WarehouseSelect fieldName="warehouses" form={form} cities={cities} disabled={!isFormEditable} />
            );
          }}
        </Form.Item>
      </Row>
    </AntCard>
  );
};

export default memo(OptionalControlForm);

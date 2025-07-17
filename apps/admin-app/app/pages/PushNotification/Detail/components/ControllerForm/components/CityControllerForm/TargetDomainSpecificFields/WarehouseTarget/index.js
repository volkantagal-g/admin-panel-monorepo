import { Row, Form } from 'antd';

import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import WarehouseSelect from '@shared/containers/Marketing/Select/WarehouseSelect';

const WarehouseTarget = ({ form, warehousesFormName, isFormEditable, cityFieldName }) => {
  const { t } = useTranslation('marketing');
  return (
    <Row gutter={24} className="mt-4 mt-lg-0">
      <Form.Item noStyle dependencies={[cityFieldName]} label={t('APP_LANGUAGES_TITLE')}>
        {({ getFieldValue }) => {
          const cities = getFieldValue(cityFieldName);
          return (
            <WarehouseSelect fieldName={warehousesFormName} form={form} cities={cities} disabled={!isFormEditable} />
          );
        }}
      </Form.Item>
    </Row>
  );
};

export default memo(WarehouseTarget);

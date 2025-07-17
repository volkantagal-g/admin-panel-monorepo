import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Form, Space } from 'antd';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import AntCard from '@shared/components/UI/AntCard';
import { convertControllerOptions, isActiveServiceAppropriateForController } from '@app/pages/PushNotification/utils';
import { CONTROLLER } from '@app/pages/PushNotification/constants';
import { controllerOptions } from '@app/pages/PushNotification/constantValues';

import StockLevelControllerForm from '@app/pages/PushNotification/New/components/ControllerForm/components/StockLevelControllerForm';
import AggressionLevelControllerForm from '@app/pages/PushNotification/New/components/ControllerForm/components/AggressionLevelControllerForm';
import CityControllerForm from '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm';

const ControllerForm = ({ form }) => {
  const { t } = useTranslation('marketing');

  const controlFormName = ['controls'];
  const controlTypeFormName = [...controlFormName, 'type'];

  return (
    <AntCard footer={false} bordered={false} title={t('CONTROLLER_TITLE')}>
      <Form.Item noStyle dependencies={['domainType']}>
        {({ getFieldValue }) => {
          const domainType = getFieldValue('domainType');
          const options = convertControllerOptions(controllerOptions, domainType).filter(item => item !== null);
          return (
            <Form.Item name={controlTypeFormName} className="w-100 d-inline">
              <Checkbox.Group
                className="w-100 py-3"
                options={options.map(item => (
                  { label: get(controllerOptions[item?.value], getLangKey(), ''), value: item?.value }))}
                onChange={checkedValue => {
                  if (!checkedValue.includes(CONTROLLER.STOCK_LEVEL_CONTROLLER)) {
                    form.setFieldsValue({ controls: { stock: null } });
                  }
                  if (!checkedValue.includes(CONTROLLER.AGGRESSION_LEVEL_CONTROLLER)) {
                    form.setFieldsValue({ controls: { aggression: null } });
                  }
                  if (!checkedValue.includes(CONTROLLER.LOCATION_BASED_CONTROLLER)) {
                    form.setFieldsValue({ controls: { locationBasedControl: null } });
                  }
                }}
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item noStyle dependencies={[controlTypeFormName, 'domainType']}>
        {({ getFieldValue }) => {
          const controlType = getFieldValue(controlTypeFormName);
          const domainType = getFieldValue('domainType');
          if (controlType && controlType.length > 0) {
            return (
              <Space direction="vertical" className="w-100">
                {controlType.includes(CONTROLLER.STOCK_LEVEL_CONTROLLER) && isActiveServiceAppropriateForController(domainType) && (
                  <StockLevelControllerForm form={form} controlFormName={controlFormName} />
                )}
                {controlType.includes(CONTROLLER.AGGRESSION_LEVEL_CONTROLLER) && isActiveServiceAppropriateForController(domainType) && (
                  <AggressionLevelControllerForm controlFormName={controlFormName} />
                )}
                {controlType.includes(CONTROLLER.LOCATION_BASED_CONTROLLER) && (
                  <CityControllerForm form={form} controlFormName={controlFormName} />
                )}
              </Space>
            );
          }
          return null;
        }}
      </Form.Item>
    </AntCard>
  );
};

export default memo(ControllerForm);

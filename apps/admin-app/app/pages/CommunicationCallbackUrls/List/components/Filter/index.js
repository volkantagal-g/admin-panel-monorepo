import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Select, Space, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FILTER_FORM } from '@app/pages/CommunicationCallbackUrls/List/components/Filter/config';
import { Creators } from '@app/pages/CommunicationCallbackUrls/List/redux/actions';
import { manipulateValuesBeforeSubmit } from '@app/pages/CommunicationCallbackUrls/List/components/Filter/utils';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { convertConstantValuesToSelectOptions, isObjectIdValid } from '@shared/utils/common';
import { serviceTypes } from '@app/pages/CommunicationCallbackUrls/constantValues';

const CallbackUrlsFilter = ({ serviceType, setServiceType }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationCallbackUrlsPage');

  const fields = useMemo(() => FILTER_FORM({ t }), [t]);

  useEffect(() => {
    dispatch(Creators.resetTableFilters());
    dispatch(Creators.setTableFilters({ filters: manipulateValuesBeforeSubmit(form.getFieldsValue(), serviceType), serviceType }));
  }, [dispatch, form, serviceType]);

  const setFilters = useMemo(
    () => debounce(values => {
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesBeforeSubmit(form.getFieldsValue(), serviceType), serviceType }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch, serviceType, form],
  );

  return (
    <Form
      form={form}
      className="mt-3 mb-2"
      layout="inline"
      onValuesChange={(changedVal, values) => {
        setFilters(values);
      }}
    >
      <Space direction="vertical" className="w-100">
        <Row gutter={4} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Form.Item hasFeedback>
              <Select
                options={convertConstantValuesToSelectOptions(serviceTypes)}
                onChange={setServiceType}
                defaultValue={serviceType}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 8]} className="w-100">
          <Col md={4} xs={24}>
            <Form.Item
              name="id"
              className="d-inline"
              rules={[
                () => ({
                  validator(rule, value) {
                    if (value && !isObjectIdValid(value)) {
                      return Promise.reject(t('ID_OBJECT_VALIDATION'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder={`${t('ID')}`} allowClear />
            </Form.Item>
          </Col>

          {/* Map fields from filter form obj */}
          {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
        </Row>
      </Space>
    </Form>
  );
};

const FieldWrapper = ({ field }) => {
  const { component: Component, props, wrapperProps } = field;
  return (
    <Col {...wrapperProps}>
      <Form.Item name={props.name} className="w-100">
        <Component {...props} />
      </Form.Item>
    </Col>
  );
};

export default memo(CallbackUrlsFilter);

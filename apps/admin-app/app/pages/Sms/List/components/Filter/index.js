import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FILTER_FORM } from '@app/pages/Sms/List/components/Filter/config';
import { Creators } from '@app/pages/Sms/List/redux/actions';
import { initialValues, manipulateValuesAfterSubmit } from '@app/pages/Sms/List/components/Filter/utils';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';

const SmsFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const langKey = getLangKey();

  const fields = useMemo(() => FILTER_FORM({ t, langKey }), [t, langKey]);

  const setFilters = useMemo(
    () => debounce(values => {
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(values) }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch],
  );

  useEffect(() => {
    // Init results with default form values on component mount
    dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(form.getFieldsValue()) }));
  }, [dispatch, form]);

  return (
    <Form
      initialValues={initialValues}
      form={form}
      className="mt-3 mb-2"
      layout="inline"
      onValuesChange={(changedVal, values) => {
        setFilters(values);
      }}
    >
      <Row gutter={[16, 8]} className="mb-2 w-100">
        <Col md={12} xs={24}>
          <Form.Item
            className="mb-0 w-100"
            name="ids"
            hasFeedback
            validateFirst
            rules={[
              () => ({
                validator(rule, clientIds) {
                  for (let i = 0; i < clientIds?.length; i += 1) {
                    if (!isObjectIdValid(clientIds[i])) {
                      return Promise.reject(t('INVALID_SMS_ID'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder={t('SMS_ID')}
              maxTagCount={3}
              className="w-100"
              mode="tags"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 8]} className="w-100">
        {/* Map fields from filter form obj */}
        {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
      </Row>
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

export default memo(SmsFilter);

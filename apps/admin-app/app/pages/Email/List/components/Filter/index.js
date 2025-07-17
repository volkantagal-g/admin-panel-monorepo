import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { Creators } from '@app/pages/Email/List/redux/actions';
import { initialValues, manipulateValuesAfterSubmit } from '@app/pages/Email/List/components/Filter/utils';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { FILTER_FORM } from '@app/pages/Email/List/components/Filter/config';
import { getLangKey } from '@shared/i18n';
import { isObjectIdValid } from '@shared/utils/common';

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

const EmailFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const langKey = getLangKey();

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);
  const fields = useMemo(() => FILTER_FORM({ t, langKey, activeDomainsFromConfig }), [t, langKey, activeDomainsFromConfig]);

  useEffect(() => {
    dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(form.getFieldsValue()) }));
  }, [dispatch, form]);

  const setFilters = useMemo(
    () => debounce(values => {
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(values) }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch],
  );

  return (
    <Form
      initialValues={initialValues}
      form={form}
      className="mt-3 mb-2"
      layout="inline"
      onValuesChange={() => {
        form.validateFields().then(values => setFilters(values)).catch(fieldData => {
          if (!fieldData?.errorFields?.length) {
            setFilters(fieldData.values);
          }
        });
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
                      return Promise.reject(t('INVALID_EMAIL_ID'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder={t('EMAIL_ID')}
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

export default memo(EmailFilter);

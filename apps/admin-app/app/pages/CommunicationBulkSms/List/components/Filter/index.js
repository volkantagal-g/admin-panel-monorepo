import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Space, Input, Select, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FILTER_FORM } from '@app/pages/CommunicationBulkSms/List/components/Filter/config';
import { Creators } from '@app/pages/CommunicationBulkSms/List/redux/actions';
import { manipulateValuesBeforeSubmit } from '@app/pages/CommunicationBulkSms/List/components/Filter/utils';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { convertSelectOptions, isObjectIdValid } from '@shared/utils/common';
import { configSelector } from '@app/pages/CommunicationBulkSms/List/redux/selectors';
import { getLangKey } from '@shared/i18n';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

const BulkSmsFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('communicationBulkSmsPage');
  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);
  const fields = useMemo(() => FILTER_FORM({ t, configData }), [configData, t]);

  useEffect(() => {
    dispatch(Creators.resetTableFilters());
    dispatch(Creators.setTableFilters({ filters: manipulateValuesBeforeSubmit(form.getFieldsValue()) }));
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
  }, [dispatch, form]);

  const setFilters = useMemo(
    () => debounce(values => {
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesBeforeSubmit(form.getFieldsValue()) }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch, form],
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
        <Row gutter={[16, 8]} className="mb-2 w-100">
          <Col lg={4} xs={12}>
            <Form.Item
              className="mb-0 w-100"
              name="id"
              hasFeedback
              validateFirst
              rules={[
                () => ({
                  validator(rule, value) {
                    if (value === '' || (value && !isObjectIdValid(value))) {
                      return Promise.reject(t('ID_OBJECT_VALIDATION'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                placeholder={t('ID')}
                className="w-100"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col lg={4} xs={12}>
            <TargetDomainSelect
              fieldName="senderDomain"
              allowClear
              label={false}
              onChange={() => {
                form.setFieldsValue({ senderOrganizationId: undefined });
              }}
            />
          </Col>
          <Col lg={4} xs={12}>
            <Form.Item noStyle dependencies={['senderDomain']}>
              {({ getFieldValue }) => {
                const targetDomain = getFieldValue('senderDomain');
                return (
                  <Tooltip title={t('SENDER_ORGANIZATION_TOOLTIP')}>
                    <Form.Item
                      name="senderOrganization"
                    >
                      <Select
                        loading={isConfigPending}
                        disabled={isConfigPending || !targetDomain}
                        placeholder={t('SENDER_ORGANIZATION')}
                        options={convertSelectOptions(
                          configData?.senderOrganizations?.[targetDomain],
                          {
                            valueKey: 'id',
                            labelKey: 'organizationName',
                            hasTranslationKey: true,
                          },
                        )}
                        allowClear
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }}
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

export default memo(BulkSmsFilter);

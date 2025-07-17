import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { RollbackOutlined } from '@ant-design/icons';

import { FILTER_FORM } from '@app/pages/Banner/List/components/Filter/config';
import { Creators } from '@app/pages/Banner/List/redux/actions';
import { initialValues, manipulateValuesAfterSubmit } from '@app/pages/Banner/List/components/Filter/utils';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { INITIAL_STATE } from '@app/pages/Banner/List/redux/reducer';

const BannerFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');
  const langKey = getLangKey();

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);
  const fields = useMemo(() => FILTER_FORM({ t, langKey, activeDomainsFromConfig }), [t, langKey, activeDomainsFromConfig]);

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
      role="form"
      className="mt-3 mb-2"
      layout="inline"
      onValuesChange={(changedVal, values) => {
        setFilters(values);
      }}
    >
      <Row gutter={[16, 8]} className="mb-2 w-100 mr-0 justify-content-between">
        <Col md={8} xs={24}>
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
                      return Promise.reject(t('INVALID_BANNER_ID'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder={t('BANNER_ID')}
              maxTagCount={3}
              className="w-100"
              mode="tags"
              allowClear
            />
          </Form.Item>
        </Col>

        <Col lg={3} className="text-right align-self-end">
          <Button
            className="w-100"
            icon={<RollbackOutlined />}
            onClick={() => {
              dispatch(Creators.setTableFilters({ filters: INITIAL_STATE.filters }));
              form.resetFields();
            }}
          >{t('RESET_FILTERS')}
          </Button>
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

export default memo(BannerFilter);

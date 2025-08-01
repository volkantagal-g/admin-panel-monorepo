import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { RollbackOutlined } from '@ant-design/icons';

import { FILTER_FORM } from '@app/pages/MarketingApproval/List/components/Filter/config';
import { Creators } from '@app/pages/MarketingApproval/List/redux/actions';
import { initialValues, manipulateValuesAfterSubmit } from '@app/pages/MarketingApproval/List/components/Filter/utils';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { INITIAL_STATE } from '@app/pages/MarketingApproval/List/redux/reducer';

const MarketingApprovalFilter = () => {
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
    <Row>
      <Col lg={24}>
        <Form
          initialValues={initialValues}
          form={form}
          role="form"
          className="mt-3 mb-2 w-100"
          onValuesChange={(changedVal, values) => {
            setFilters(values);
          }}
        >
          <Row gutter={24} justify="end" className="mb-2 between">
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

          <Row gutter={24}>
            {/* Map fields from filter form obj */}
            {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
          </Row>
        </Form>
      </Col>
    </Row>

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

export default memo(MarketingApprovalFilter);

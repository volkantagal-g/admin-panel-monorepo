import { memo, useMemo } from 'react';
import { Form, Row, Col, Button, Select, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { RollbackOutlined } from '@ant-design/icons';

import { FILTER_FORM } from '@app/pages/PushNotification/List/components/Filter/filterFormConstants';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { transformValuesForApi } from '@app/pages/PushNotification/List/components/Filter/filterUtils';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';
import { INITIAL_STATE } from '@app/pages/PushNotification/List/redux/reducer';

import NotificationTagSelect from '@shared/containers/Marketing/Select/NotificationTagSelect';

const PushNotificationList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { t } = useTranslation('marketing');
  const langKey = getLangKey();

  const fields = useMemo(() => FILTER_FORM({ t, langKey }), [t, langKey]);

  const setTableFilters = useMemo(
    () => debounce(values => {
      const queryParams = transformValuesForApi(values, langKey);
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setFilters({ data: queryParams }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch, langKey],
  );

  return (
    <Form
      form={form}
      className="mt-3 mb-2 w-100"
      layout="inline"
      onValuesChange={() => {
        form.validateFields().then(values => setTableFilters(values)).catch(fieldData => {
          if (!fieldData?.errorFields?.length) {
            setTableFilters(fieldData.values);
          }
        });
      }}
    >
      <Row gutter={[16, 8]} className="mb-2 w-100">
        <Col lg={6}>
          <Form.Item
            className="mb-0 w-100"
            name="ids"
            validateFirst
            rules={[
              () => ({
                validator(rule, clientIds) {
                  for (let i = 0; i < clientIds?.length; i += 1) {
                    if (!isObjectIdValid(clientIds[i])) {
                      return Promise.reject(t('INVALID_NOTIFICATION_ID'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder={t('NOTIFICATION_ID')}
              maxTagCount={3}
              className="w-100"
              mode="tags"
            />
          </Form.Item>
        </Col>
        <Col lg={6}>
          <Form.Item
            className="mb-0 w-100"
            name="title"
            validateFirst
          >
            <Input
              placeholder={t('NOTIFICATION_TITLE')}
              maxTagCount={3}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col lg={4}>
          <NotificationTagSelect inline fieldName="notificationCategory" />
        </Col>
        <Col lg={8} className="text-right">
          <Button
            icon={<RollbackOutlined />}
            onClick={() => {
              dispatch(Creators.setFilters({ data: INITIAL_STATE.filters }));
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

export default memo(PushNotificationList);

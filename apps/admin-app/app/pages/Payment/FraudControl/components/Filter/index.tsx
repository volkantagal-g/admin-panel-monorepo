import { Button, Col, Collapse, Form, Input, Row, Typography } from 'antd';
import { ReactElement, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { INIT_FILTERS, InitFiltersTypes } from '../constants';
import AntSelect from '@shared/components/UI/AntSelect';
import { allRulesSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = (): ReactElement => {
  const { t } = useTranslation(['paymentFraudControlPage', 'global']);
  const allRulesIsPending = useSelector(allRulesSelector.getIsPending);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: InitFiltersTypes) => {
    dispatch(Creators.getAllRulesRequest({ ...values }));
  };

  useEffect(() => {
    dispatch(Creators.getAllRulesRequest({ ...INIT_FILTERS }));
  }, [dispatch]);

  return (
    <Collapse defaultActiveKey={1} className="mb-4">
      <Panel header={t('global:FILTER')} key={1}>
        <Form
          form={form}
          name="filterForm"
          initialValues={{ enable: INIT_FILTERS.enable }}
          onFinish={onFinish}
          className="w-100"
        >
          <Col span={24}>
            <Row gutter={16}>
              <Col md={6} xs={24}>
                <Text>{t('IS_ENABLE')}</Text>
                <Form.Item name="enable" className="mb-0">
                  <AntSelect
                    placeholder={t('IS_ENABLE')}
                    allowClear
                    className="w-100"
                    optionFilterProp="label"
                    options={[
                      { label: 'Enable', value: true },
                      { label: 'Disable', value: false },
                    ]}
                    disabled={allRulesIsPending}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Row justify="end">
            <Form.Item className="mb-0">
              <Button
                type="primary"
                disabled={allRulesIsPending}
                htmlType="submit"
              >
                {t('BRING')}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filter;

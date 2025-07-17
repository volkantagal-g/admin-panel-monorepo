import { memo, useEffect, useState } from 'react';
import { Form, Skeleton, Row, Col, Collapse, Space, Divider, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { formRules } from '@app/pages/Popup/List/components/GlobalRuleset/formHelpers';
import { Creators } from '@app/pages/Popup/List/redux/actions';
import { globalRulesetSelector } from '@app/pages/Popup/List/redux/selectors';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const FormActions = ({ form, isFormEditable, setIsFormEditable, t, isPending }) => {
  const { Can } = usePermission();
  return (
    <Row justify="end" gutter={16}>
      {isFormEditable ? (
        <>
          <Col>
            <Button
              size="small"
              onClick={() => {
                setIsFormEditable(false);
                form.resetFields();
              }}
            >
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button disabled={isPending} size="small" type="primary" htmlType="submit">
              {t('button:SAVE')}
            </Button>
          </Col>
        </>
      ) : (
        <Col>
          <Can permKey={permKey.PAGE_POPUP_LIST_COMPONENT_GLOBAL_RULESET_PANE_EDIT_BUTTON}>
            <Button disabled={isPending} size="small" onClick={() => setIsFormEditable(true)}>
              {t('button:EDIT')}
            </Button>
          </Can>
        </Col>
      )}
    </Row>
  );
};

const GetirGlobalRulesetPane = () => {
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const ruleset = useSelector(globalRulesetSelector.getRuleSet);

  // Update form when selector changed
  useEffect(() => {
    if (ruleset.data) {
      form.setFieldsValue(ruleset.data);
    }
  }, [ruleset.data, form]);

  return (

    <Collapse onChange={e => {
      if (e.length > 0) {
        dispatch(Creators.getGlobalRulesetRequest({}));
      }
    }}
    >
      <Panel header={t('GLOBAL_RULESETS')} key="1">
        <Space direction="vertical" className="w-100">
          <Form
            initialValues={ruleset.data}
            form={form}
            layout="vertical"
            onFinish={values => {
              dispatch(Creators.setGlobalRulesetRequest({ data: values }));
              setIsFormEditable(false);
            }}
          >
            {!ruleset.isPending ? (
              <Row gutter={24}>
                <Col lg={6}>
                  <Form.Item
                    rules={formRules.hourlyMax}
                    label={t('HOURLY_MAX_SHOWN_COUNT')}
                    name="hourly"
                  >
                    <Input
                      disabled={!isFormEditable || ruleset.isPending}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    rules={formRules.dailyMax}
                    label={t('DAILY_MAX_SHOWN_COUNT')}
                    name="daily"
                  >
                    <Input
                      disabled={!isFormEditable || ruleset.isPending}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    rules={formRules.weeklyMax}
                    label={t('WEEKLY_MAX_SHOWN_COUNT')}
                    name="weekly"
                  >
                    <Input
                      disabled={!isFormEditable || ruleset.isPending}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item
                    rules={formRules.monthlyMax}
                    label={t('MONTHLY_MAX_SHOWN_COUNT')}
                    name="monthly"
                  >
                    <Input
                      disabled={!isFormEditable || ruleset.isPending}
                      type="number"
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )
              :
              <Skeleton active paragraph={{ rows: 1 }} width="100%" />}
            <Divider className="mt-0" />
            <FormActions
              form={form}
              isPending={ruleset.isPending}
              isFormEditable={isFormEditable}
              setIsFormEditable={setIsFormEditable}
              t={t}
            />
          </Form>
        </Space>
      </Panel>
    </Collapse>
  );
};

export default memo(GetirGlobalRulesetPane);

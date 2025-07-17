import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, Col, Collapse, Form, Input, Row, Select, Skeleton, Tooltip } from 'antd';

import { compose } from 'redux';

import { PaneHeader } from '@app/pages/Promo/Detail/components/CommunicationsForm/PaneHeader';
import { Switch } from '@shared/components/GUI';
import { STATUS } from '@app/pages/MarketingApproval/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { AICommunicationsSlice } from '@app/pages/Promo/Detail/components/CommunicationsForm/slice';
import { aiCommunicationsSaga } from '@app/pages/Promo/Detail/components/CommunicationsForm/saga';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { COMMS_ASSETS } from '@app/pages/Promo/constantValues';
import { useInitAndDestroyPage } from '@shared/hooks';

const { Panel } = Collapse;

function CommunicationsForm() {
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const isPending = useSelector(AICommunicationsSlice.selectors.isLoading);
  const initialValues = useSelector(PromoDetailSlice.selectors.aiCommunicationsFormInitialValues);

  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm();

  const resetErrors = () => {
    form.setFields([
      { name: 'assets', errors: [] },
      { name: 'description', errors: [] },
    ]);
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  useInitAndDestroyPage({ dispatch, Creators: AICommunicationsSlice.actions });

  if (isPending) {
    return <Skeleton active />;
  }

  return (
    <Form
      scrollToFirstError
      form={form}
      initialValues={initialValues}
      layout="horizontal"
      preserve={false}
      name="communicationsForm"
      labelCol={{ flex: '150px' }}
      labelAlign="left"
      onFinish={values => dispatch(AICommunicationsSlice.actions.generateAICommunicationsRequest(values))}
    >
      <Form.Item name="isCommsEnabled" valuePropName="checked" label={t('COMMUNICATIONS.AI_GENERATION')} labelCol={5}>
        <Switch
          disabled={!isFormEditable}
          onChange={checked => {
            if (!checked) {
              // Reset form errors
              resetErrors();
            }
          }}
        />
      </Form.Item>

      <Form.Item noStyle dependencies={['isCommsEnabled']}>
        {({ getFieldValue }) => {
          const aiEnabled = getFieldValue('isCommsEnabled');

          return (
            <Row gutter={24}>
              <Col lg={12}>
                <Form.Item
                  name="assets"
                  rules={aiEnabled ? [{ required: true, message: t('error:REQUIRED'), type: 'array' }] : null}
                >
                  <Select
                    disabled={!isFormEditable || !aiEnabled}
                    placeholder={t('COMMUNICATIONS.ASSETS_TO_CREATE')}
                    mode="multiple"
                    options={convertConstantValuesToSelectOptions(COMMS_ASSETS)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="description"
                  rules={aiEnabled ? [{ required: true, message: t('error:REQUIRED') }] : null}
                >
                  <Input
                    disabled={!isFormEditable || !aiEnabled}
                    placeholder={t('COMMUNICATIONS.MESSAGE')}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
          );
        }}
      </Form.Item>

      <FormFooter
        isFormEditable={isFormEditable}
        setIsFormEditable={setIsFormEditable}
        resetErrors={resetErrors}
        t={t}
      />
    </Form>
  );
}

const FormFooter = ({ isFormEditable, setIsFormEditable, t, resetErrors }) => {
  const { data: commsDetails } = useSelector(PromoDetailSlice.selectors.aiCommunicationsStatus);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const updateDisabled = commsDetails?.status === STATUS.IN_PROGRESS || commsDetails?.status === STATUS.SENDING || isParent;

  return (
    <Row gutter={24} className="pb-md-0 mt-2">
      {isFormEditable ? (
        <Col lg={24} className="text-right w-100">
          <Form.Item className="mt-0 d-inline-block mr-3">
            <Button
              size="small"
              onClick={() => {
                resetErrors();
                setIsFormEditable(false);
              }}
            >
              {t('button:CANCEL')}
            </Button>
          </Form.Item>

          <Form.Item className="mt-0 d-inline-block">
            <Button
              size="small"
              htmlType="submit"
              data-test="save-btn"
            >
              {commsDetails?.status && commsDetails?.status !== STATUS.SENDING ? t('button:REGENERATE') : t('button:SAVE')}
            </Button>
          </Form.Item>
        </Col>
      ) : (
        <Col lg={24} className="text-right">
          <Tooltip title={updateDisabled && t('COMMUNICATIONS.CANT_UPDATE_ON_THIS_PROCESS_STATUS')}>
            <Button
              disabled={updateDisabled}
              size="small"
              onClick={() => {
                setIsFormEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};

const CommunicationsSection = memo(function CommunicationsSection() {
  return (
    <Collapse
      style={{ marginBottom: 10 }}
      expandIcon={() => null}
    >
      <Panel header={<PaneHeader />} key={1}>
        <CommunicationsForm />
      </Panel>
    </Collapse>
  );
});

const withSaga = injectSaga({ key: AICommunicationsSlice.reducerPath, saga: aiCommunicationsSaga });
const withReducer = injectReducer({ key: AICommunicationsSlice.reducerPath, reducer: AICommunicationsSlice.reducer });

export default compose(withReducer, withSaga)(CommunicationsSection);

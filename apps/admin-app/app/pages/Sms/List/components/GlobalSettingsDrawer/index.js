import { memo, useState } from 'react';
import { Drawer, Button, Row, Col, Form, InputNumber, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/Sms/List/components/GlobalSettingsDrawer/formHelpers';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { globalSettingsSelector } from '@app/pages/Sms/List/redux/selectors';
import { Creators } from '@app/pages/Sms/List/redux/actions';

const GlobalSettingsDrawer = ({ visible, setVisible }) => {
  const { t } = useTranslation('marketing');
  const [isFormEditable, setIsFormEditable] = useState(false);
  const selectedCountry = getSelectedCountry();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isGlobalSettingsPending = useSelector(globalSettingsSelector.isPending);
  const globalSettings = useSelector(globalSettingsSelector.getData);

  return (
    <Drawer
      title={`Sms ${t('GLOBAL_RULESET')}`}
      placement="right"
      // TODO: We can store and arrange with , the other z-index values on one
      // First of all needs to decide simple orders (for example: defaultPopover > defaultModal > defaultDrawer > sidebar )
      // Currently sidebar has more priority then others in all cases
      zIndex={200001}
      destroyOnClose
      onClose={() => {
        setVisible(false);
        setIsFormEditable(false);
      }}
      visible={visible}
      extra={<h5 className="m-0">{get(selectedCountry, ['flag'], '')}</h5>}
      footer={<DrawerFooter isEditable={isFormEditable} setIsEditable={setIsFormEditable} t={t} form={form} />}
    >
      <Skeleton active={isGlobalSettingsPending} loading={isGlobalSettingsPending}>
        <Form
          form={form}
          onFinish={values => {
            dispatch(Creators.updateGlobalSettingsRequest({ body: manipulateValuesBeforeSubmit(values) }));
          }}
          size="small"
          labelCol={{ span: 8 }}
          labelAlign="left"
          initialValues={getInitialValues(globalSettings)}
        >

          <Row gutter={24}>
            <Col lg={24}>
              <Form.Item
                label={t('DAILY_CAP.LABEL')}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
                tooltip={t('DAILY_LIMIT_PER_USER')}
                name={['rule', 'dailyLimitPerUser']}
              >
                <InputNumber
                  className="w-100"
                  disabled={!isFormEditable}
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Skeleton>
    </Drawer>
  );
};

const DrawerFooter = ({ isEditable, setIsEditable, form, t }) => {
  return (
    <Row justify="end" gutter={24}>
      {isEditable ? (
        <>
          <Col>
            <Button
              size="small"
              onClick={() => {
                setIsEditable(false);
              }}
            >
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button size="small" onClick={() => form.submit()}>
              {t('button:SAVE')}
            </Button>
          </Col>
        </>
      ) : (
        <Col>
          <Button
            size="small"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            {t('button:EDIT')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default memo(GlobalSettingsDrawer);

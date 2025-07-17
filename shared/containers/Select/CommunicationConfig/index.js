import { compose } from 'redux';

import { Col, Form, Row, Select, Tooltip } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { rules } from '@app/pages/TransactionalNotification/New/formHelpers';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

const SelectCommunicationConfig = ({ configData, isConfigPending, componentName, isFormEditable = true, serviceType = 'Notification' }) => {
  const { t } = useTranslation(serviceType === 'SMS' ? 'transactionalSmsPage' : 'transactionalNotificationPage');
  return (
    <>
      {componentName === 'SENDER' && (
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="type"
              label={t('SENDER')}
              rules={rules.onlyRequired}
            >
              <Select
                loading={isConfigPending}
                disabled={isConfigPending || !isFormEditable}
                options={convertConstantValuesToSelectOptions(configData?.types, false)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {componentName === 'TYPE' && (
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name={serviceType === 'SMS' ? 'smsType' : 'notificationType'}
              label={(
                <Tooltip title={t('TYPE_TOOLTIP')}>
                  {t('TYPE')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              <Select
                loading={isConfigPending}
                disabled={isConfigPending || !isFormEditable}
                options={convertConstantValuesToSelectOptions(serviceType === 'SMS' ? configData?.smsTypes : configData?.notificationTypes, false)}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {componentName === 'INTERRUPTION_LEVELS' && (
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            hasFeedback
            name="notificationInterruptionLevel"
            label={(
              <Tooltip title={t('INTERRUPTION_LEVELS_WARNING')}>
                {t('INTERRUPTION_LEVELS')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
              </Tooltip>
            )}
            rules={rules.onlyRequired}
          >
            <Select
              disabled={!isFormEditable}
              options={convertConstantValuesToSelectOptions(configData?.interruptionLevels, false)}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      )}
    </>
  );
};

export default compose()(SelectCommunicationConfig);

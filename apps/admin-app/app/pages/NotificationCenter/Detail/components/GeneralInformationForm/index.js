import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, Tooltip, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { statusTypeOptions } from '@app/pages/NotificationCenter/constantValues';
import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { rules } from '@shared/utils/marketing/formUtils';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import {
  DEVICE_TYPES, GETIR_BITAKSI_DOMAIN_TYPE, GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE, GETIR_JOB_DOMAIN_TYPE, GETIR_N11_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { convertPlatformOptions } from '../../../utils';

const GeneralInformationForm = ({ isFormEditable, form }) => {
  const { t } = useTranslation('marketing');

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>

        <Row gutter={24} className="mt-3">
          <Col lg={12}>
            <Form.Item name="status" label={t('STATUS')} rules={rules.onlyRequired}>
              <Select disabled={!isFormEditable} options={convertConstantValuesToSelectOptions(statusTypeOptions)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} className="mt-3">
          <Col md={12} xs={24}>
            <TargetDomainSelect
              fieldName="targetDomain"
              rules={rules.onlyRequired}
              disabled={!isFormEditable}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="customTag">
              <Input placeholder={`${t('CUSTOM_LABEL')}`} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <TargetDomainSelect
              fieldName="domainType"
              filteredDomains={[
                GETIR_FINANCE_DOMAIN_TYPE,
                GETIR_SELECT_DOMAIN_TYPE,
                GETIR_FOOD_DOMAIN_TYPE,
                GETIR_JOB_DOMAIN_TYPE,
                GETIR_DRIVE_DOMAIN_TYPE,
                GETIR_N11_DOMAIN_TYPE,
                GETIR_BITAKSI_DOMAIN_TYPE,
              ]}
              label={t('ACTIVE_DOMAIN')}
              rules={rules.onlyRequired}
              disabled={!isFormEditable}
              onChange={() => {
                form.setFields([{ name: 'pageIds', value: [] }]);
              }}
            />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item name="clientSegments" label={t('SEGMENTS')} rules={rules.requiredArray}>
              <Select mode="tags" placeholder={t('Segment')} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item name="clientExSegments">
              <Select mode="tags" placeholder={t('EXCLUDED_SEGMENT')} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item name="deviceTypes" label={t('PLATFORM')} rules={rules.onlyRequired}>
              <Select
                mode="multiple"
                options={convertPlatformOptions(DEVICE_TYPES)}
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              name="priority"
              label={(
                <Tooltip title={t('PRIORITY_HELPER')}>
                  {t('PRIORITY')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              <InputNumber controls={false} className="w-100" min={1} max={1000} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
        </Row>

      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

export default memo(GeneralInformationForm);

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Form, Input, Row, Select, Tooltip, InputNumber, Checkbox } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { rules } from '@shared/utils/marketing/formUtils';
import { BANNER_TYPE } from '@app/pages/Banner/constants';
import { bannerTypes } from '@app/pages/Banner/constantValues';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import {
  DEVICE_TYPES,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { convertPlatformOptions } from '../../../utils';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import SegmentSelect from '@shared/containers/Marketing/Select/SegmentSelect';

const GeneralInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>

        <Row gutter={24} className="mt-3">
          <Col md={12} xs={24}>
            <TargetDomainSelect
              tooltip={t('TARGET_DOMAIN_INFORMATION')}
              fieldName="targetDomain"
              rules={rules.onlyRequired}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="customTag" rules={rules.onlyRequired}>
              <Input placeholder={`${t('CUSTOM_LABEL')} *`} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <TargetDomainSelect
              tooltip={t('SOURCE_DOMAIN_INFORMATION')}
              fieldName="domainType"
              filteredDomains={[
                GETIR_FINANCE_DOMAIN_TYPE,
                GETIR_SELECT_DOMAIN_TYPE,
                GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
                GETIR_JOB_DOMAIN_TYPE,
                GETIR_DRIVE_DOMAIN_TYPE,
                GETIR_N11_DOMAIN_TYPE,
                GETIR_BITAKSI_DOMAIN_TYPE,
              ]}
              label={t('ACTIVE_DOMAIN')}
              rules={rules.onlyRequired}
              onChange={() => {
                form.setFields([{ name: 'pageIds', value: [] }]);
                form.setFields([{ name: 'componentType', value: null }]);
              }}
            />
          </Col>
          <Col lg={12}>
            <Form.Item name="deviceTypes" rules={rules.onlyRequired}>
              <Select
                mode="multiple"
                placeholder={t('PLATFORM')}
                options={convertPlatformOptions(DEVICE_TYPES)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} className="mt-4 mt-sm-0">
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              name="type"
              label={(
                <Tooltip title={t('PROMO_BANNER_SELECTION_WARNING')}>
                  {t('BANNER_TYPE')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              {/* Can't create advert banner on admin panel , should use advert panel */}
              <Select
                options={convertConstantValuesToSelectOptions(bannerTypes).filter(typeOption => typeOption?.value !== BANNER_TYPE.ADVERT)}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item noStyle dependencies={['type', 'targetDomain']}>
              {({ getFieldsValue }) => {
                const { type, targetDomain } = getFieldsValue(['targetDomain', 'type']);
                return type === BANNER_TYPE.PROMO_PAGE ? (
                  <PromotionSelect hasMultiple form={form} fieldName="promoIdList" targetServiceId={targetDomain} inline rules={rules.onlyRequired} />
                ) : null;
              }}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <SegmentSelect label={t('SEGMENTS')} fieldName="clientSegments" mode="multiple" />
          </Col>
          <Col lg={12}>
            <SegmentSelect label={t('EXCLUDED_SEGMENT')} fieldName="clientExcludedSegments" mode="multiple" inline />
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
              <InputNumber controls={false} className="w-100" min={1} max={1000} />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              tooltip={t('AVAILABLE_FOR_PUBLIC_FIELD_INFO')}
              labelCol={{ span: 7 }}
              name="publicBanner"
              label={t('AVAILABLE_FOR_PUBLIC')}
              initialValue
              valuePropName="checked"
            >
              <Checkbox />
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

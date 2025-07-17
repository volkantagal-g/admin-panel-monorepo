import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import { Badge, Col, DatePicker, Form, InputNumber, Row, Select, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import AntCard from '@shared/components/UI/AntCard';
import { popupTypeOptions } from '@app/pages/Popup/constantValues';
import { POPUP_TYPE } from '@app/pages/Popup/constants';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { rules } from '@shared/utils/marketing/formUtils';
import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import {
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
} from '@shared/shared/constants';
import SegmentSelect from '@shared/containers/Marketing/Select/SegmentSelect';

const GeneralInformationForm = ({ form }) => {
  const { t } = useTranslation('marketing');

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
        <Row gutter={24} className="mt-3">
          <Col lg={12}>
            <TargetDomainSelect
              fieldName="activeDomains"
              label={t('ACTIVE_DOMAINS')}
              rules={rules.requiredArray}
              mode="multiple"
              filteredDomains={[
                GETIR_SELECT_DOMAIN_TYPE,
                GETIR_DRIVE_DOMAIN_TYPE,
                GETIR_N11_DOMAIN_TYPE,
              ]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <TargetDomainSelect fieldName="domainType" rules={rules.onlyRequired} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item name="type" label={t('POPUP_TYPE')} rules={rules.onlyRequired}>
              <Select>
                {convertConstantValuesToSelectOptions(popupTypeOptions).map(popupType => (
                  <Select.Option
                    key={popupType?.value}
                    value={popupType?.value}
                  >
                    {popupType?.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item noStyle dependencies={['domainType', 'type']}>
              {({ getFieldValue }) => {
                const popupType = getFieldValue('type');
                if (POPUP_TYPE.PROMO === popupType) {
                  return (
                    <PromotionSelect form={form} fieldName="promo" targetServiceId={getFieldValue('domainType')} inline rules={rules.onlyRequired} />
                  );
                }
                return null;
              }}
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
              <InputNumber controls={false} className="w-100" min={1} max={1000} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <SegmentSelect label={t('SEGMENTS')} fieldName="clientSegments" mode="multiple" rules={rules.requiredArray} />
          </Col>
          <Col lg={12}>
            <SegmentSelect label={t('EXCLUDED_SEGMENT')} fieldName="clientExSegments" mode="multiple" inline />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item
              name="maxShownCondition"
              label={(
                <Tooltip title={t('MAX_DISPLAY_COUNT_HELPER')}>
                  {t('MAX_DISPLAY_COUNT')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                </Tooltip>
              )}
              rules={rules.onlyRequired}
            >
              <InputNumber controls={false} className="w-100" min={1} max={1000} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={12}>
            <Form.Item name="validDates" label={t('POPUP_DATE')} rules={rules.onlyRequired}>
              <DatePicker.RangePicker
                showTime
                className="w-100"
                ranges={{
                  [t('TO_END_OF_DAY')]: [moment(), moment().endOf('day')],
                  [t('TO_END_OF_MONTH')]: [moment(), moment().endOf('month')],
                  [t('TO_END_OF_YEAR')]: [moment(), moment().endOf('year')],
                }}
              />
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

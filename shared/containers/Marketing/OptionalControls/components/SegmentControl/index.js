import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Card, Select } from 'antd';

import { rules } from '@shared/utils/marketing/formUtils';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { optionalControlOption } from '@shared/containers/Marketing/OptionalControls/constantValues';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';

const inclusionTypeOptions = optionalControlOption[OPTIONAL_CONTROL.SEGMENT]?.inclusionTypeOptions || [];

const SegmentControl = ({ parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');

  const controlFieldName = 'segment';
  const formName = parentFieldName ? [...[parentFieldName], controlFieldName] : [controlFieldName];

  return (
    <Card size="small" title={t('SEGMENT_CONTROL')}>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item name={[...formName, 'segments']} label={t('SEGMENTS')} rules={rules.requiredArray}>
            <Select mode="tags" placeholder={t('SEGMENTS')} disabled={disabled} />
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            hasFeedback
            name={[...formName, 'inclusionType']}
            label={t('INCLUSION_TYPE')}
            rules={[{ required: true, message: t('error:REQUIRED') }]}
          >
            <Select
              disabled={disabled}
              options={convertConstantValuesToSelectOptions(inclusionTypeOptions)}
              placeholder={`${t('INCLUSION_TYPE')}`}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default memo(SegmentControl);

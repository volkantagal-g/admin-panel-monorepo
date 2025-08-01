import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import MultipleSelect from '../MultipleSelect';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

const SegmentListSelect = ({
  description,
  activeKey,
  value,
  label,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  return (
    <Row align="middle">
      <Col span={11}>
        <MultipleSelect
          activeKey={activeKey}
          label={label || t('SEGMENTS')}
          description={description}
          clientListKey="segments"
          value={value}
          mode="tags"
          selectable={[]}
        />
      </Col>
      <Col>
        <RedirectText
          text={t('SEGMENT_LIST')}
          to="/segment/list"
          permKey={permKey.PAGE_SEGMENT_LIST}
        />
      </Col>
    </Row>
  );
};

export default SegmentListSelect;

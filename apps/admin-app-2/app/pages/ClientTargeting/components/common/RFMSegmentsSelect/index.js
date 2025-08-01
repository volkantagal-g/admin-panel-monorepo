import { Row, Col } from 'antd';

import MultipleSelect from '../MultipleSelect';

const RFMSegmentsSelect = ({
  activeKey,
  value,
  label,
  clientListKey,
  selectable,
  disabled = false,
}) => {

  return (
    <Row align="middle">
      <Col span={11}>
        <MultipleSelect 
          activeKey={activeKey}
          value={value}
          label={label}
          clientListKey={clientListKey}
          selectable={selectable}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

export default RFMSegmentsSelect;

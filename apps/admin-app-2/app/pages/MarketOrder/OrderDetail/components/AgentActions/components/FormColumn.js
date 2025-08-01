import { Col } from 'antd';

const FormColumn = ({ formLabelComponent, formInputComponent }) => (
  <Col span={11}>
    <Col span={24}>
      {formLabelComponent}
    </Col>
    <Col span={24}>
      {formInputComponent}
    </Col>
  </Col>
);

export default FormColumn;

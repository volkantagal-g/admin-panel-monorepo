import { Form, Col } from 'antd';

const ColumnFieldWrapper = ({
  key,
  colSpan = 12,
  value,
  name,
  label,
  component: Component,
  ...rest
}) => {

  return (
    <Col span={colSpan}>
      <Form.Item
        name={name}
        label={label}
      >
        <Component value={value} {...rest} />
      </Form.Item>
    </Col>
  );
};

export default ColumnFieldWrapper;
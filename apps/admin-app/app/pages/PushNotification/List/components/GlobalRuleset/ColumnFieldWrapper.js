import { Form, Col } from 'antd';

const ColumnFieldWrapper = ({
  key,
  colSpan = 12,
  value,
  name,
  label,
  className,
  component: Component,
  ...rest
}) => {
  return (
    <Col className={className} span={colSpan}>
      <Form.Item
        name={name}
        label={label}
      >
        <Component value={value} name={name} {...rest} />
      </Form.Item>
    </Col>
  );
};

export const BareFieldWrapper = ({
  value,
  component: Component,
  ...rest
}) => <Component value={value} {...rest} />;

export default ColumnFieldWrapper;

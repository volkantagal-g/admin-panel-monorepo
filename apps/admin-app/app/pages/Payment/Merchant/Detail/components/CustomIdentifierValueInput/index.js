import { Input } from 'antd';

export const CustomIdentifierValueInput = ({ type, ...customIdentifier }) => {
  return <Input type={type} {...customIdentifier} />;
};

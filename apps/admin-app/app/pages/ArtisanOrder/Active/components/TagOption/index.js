import { Select, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const TagOption = (value, text) => {
  const customKey = `${text}_${value}`;
  return (
    <Option
      value={value}
      key={customKey}
      title={value}
    >
      <Text>{text}</Text>
    </Option>
  );
};

export default TagOption;

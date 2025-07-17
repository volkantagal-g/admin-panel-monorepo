import { Select, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const TagOption = (id, text, value) => {
  const customKey = `${text}_${id}`;
  return (
    <Option
      value={value?.toString() || id}
      key={customKey}
      title={id}
    >
      <Text>{text}</Text>
    </Option>
  );
};

export default TagOption;

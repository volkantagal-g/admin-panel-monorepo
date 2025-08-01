import { Radio, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const { Text } = Typography;

const RadioButtonGroup = ({ onChange, value, options, name }) => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{name}</Text>
      <Radio.Group onChange={onChange} value={value}>
        {options.map(option => (
          <Radio key={option.value} value={option.value}>{t(option.label)} {option.value}</Radio>
        ))}
      </Radio.Group>
    </Space>
  );
};

export default RadioButtonGroup;

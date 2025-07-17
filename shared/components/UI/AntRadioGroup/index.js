import { Radio } from 'antd';

import useStyles from './styles';

// Can be button group if you pass optionType="button"
const AntRadioGroup = props => {
  const {
    options,
    onChange,
    value,
    fullWidth,
    customClassNames = [],
    optionType = 'default',
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Radio.Group
      className={[...customClassNames, fullWidth ? classes.fullWidth : null]}
      options={options}
      onChange={onChange}
      value={value}
      optionType={optionType}
      {...rest}
    />
  );
};

export default AntRadioGroup;

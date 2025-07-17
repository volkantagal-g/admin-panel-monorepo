import { Select, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { isUndefined } from 'lodash';

import { getLangKey } from '@shared/i18n';

import useStyles from './styles';
import { Creators } from '../../../redux/actions';

const { Text } = Typography;

const SingleSelect = ({
  activeKey,
  clientListKey,
  selectable,
  label,
  value,
  placeholder,
  description,
  filterableData,
  tagValue = 'value',
  tagKey = 'key',
  disabled = false,
  onSearch,
  onSelected,
  allowClear = false,
  isLoading = false,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tagOptions = selectable.map(tag => {
    const tagName = typeof tag[tagValue] === 'object' ? tag[tagValue][getLangKey()] : tag[tagValue];
    return { value: tag[tagKey], label: tagName };
  });

  const handleSelectChange = selectedValue => {
    let formattedValue = selectedValue;
    if (isUndefined(formattedValue)) {
      formattedValue = null;
    }

    dispatch(Creators.setInput({ activeKey, clientListKey, value: formattedValue, filterableData }));
    if (typeof onSelected === 'function') onSelected(formattedValue);
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{label}</Text>
      <Select
        showSearch
        className={classes.fullWidth}
        value={value}
        onChange={handleSelectChange}
        showArrow={false}
        placeholder={placeholder}
        disabled={disabled}
        onSearch={onSearch}
        options={tagOptions}
        optionFilterProp="label"
        allowClear={allowClear}
        loading={isLoading}
      />
      {description && <small>{description}</small>}
    </Space>
  );
};

export default SingleSelect;

import { Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { MARKET_FRANCHISE_TYPES } from '@shared/shared/constants';
import useStyles from './styles';

const { Text } = Typography;
const { Option } = Select;

function TagOption(value, text) {
  const customKey = (value.toString(36) + value);
  return (
    <Option
      value={value}
      key={customKey}
      title={value}
    >
      <Text>{text}</Text>
    </Option>
  );
}

const SelectFranchiseType = ({ value, mode, onChange, showArrow, isDisabled }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const tagList = MARKET_FRANCHISE_TYPES.map(tag => {
    const tagText = t(`global:MARKET_FRANCHISE_TYPES:${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  return (
    <Select
      value={value}
      mode={mode}
      placeholder={t("global:FILTER")}
      onChange={onChange}
      disabled={isDisabled}
      showArrow={showArrow}
      className={classes.domainTypeSelect}
    >
      {tagList}
    </Select>
  );
};

export default SelectFranchiseType;

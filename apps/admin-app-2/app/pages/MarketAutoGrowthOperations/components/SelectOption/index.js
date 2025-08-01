import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const { Option } = Select;

const SelectOption = ({ handleChange, record, text, loading, data, type }) => {
  const { t } = useTranslation('marketAutoGrowthOperations');
  const classes = useStyles();

  return (
    <Select
      allowClear={false}
      defaultValue={text?.toString() || null}
      onChange={value => handleChange(value, record, type)}
      className={classes.selectItemPacket}
      loading={loading}
      notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
    >
      {data?.map(value => (
        <Option key={value} value={value} label={value}>{value}</Option>
      ))}
    </Select>
  );
};
export default SelectOption;

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import SelectTitle from '../selectTitle';
import { Creators } from '../../redux/actions';
import { CONFIG_PARAMETERS as configParameters } from '../../constants';
import useStyles from '../../styles';

const { Option } = Select;

const ConfigFilter = ({ countData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation('onOffPage');

  const setSelectedConfig = value => {
    dispatch(Creators.setSelectedConfig({ data: value }));
  };

  return (
    <div className={classes.cityFilter} data-testid="config-filter">
      <SelectTitle description={t('CONFIG')} src="config" />
      <Select
        allowClear
        className={classes.filterSelect}
        mode="multiple"
        placeholder={t('CONFIG_NAME')}
        onChange={setSelectedConfig}
      >
        {Object.entries(configParameters).map(([key, value], index) => (
          <Option key={key} value={value} label={value}>{`${value} - ${countData[index]} adet`}</Option>
        ))}
      </Select>
    </div>
  );
};

export default ConfigFilter;

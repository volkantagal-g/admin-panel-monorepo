import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';
import { autoGrowthSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';

const { Option } = Select;

const ChangeReason = ({ setSelectedReason, reasonType, selectedReason }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const changeReasons = useSelector(autoGrowthSelector.changeReasons);
  const changeReasonsLoading = useSelector(autoGrowthSelector.changeReasonsLoading);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    }}
    >
      <div className={classes.changeReasonTitle}>{t('CHANGE_REASON')}</div>
      <Select
        allowClear={false}
        showSearch
        onChange={value => setSelectedReason(value)}
        placeholder={t('SELECT_CHANGE_REASON')}
        disabled={changeReasons[reasonType]?.length === 0}
        loading={changeReasonsLoading}
        value={selectedReason}
        style={{ flex: 1 }}
      >
        {changeReasons && changeReasons[reasonType] && changeReasons[reasonType]?.map(value => (
          <Option key={value} value={value} label={value}>{value}</Option>
        ))}
      </Select>
    </div>
  );
};
export default ChangeReason;

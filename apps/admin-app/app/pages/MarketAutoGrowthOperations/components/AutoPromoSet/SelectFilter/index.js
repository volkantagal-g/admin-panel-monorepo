import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const { Option } = Select;

const SelectFilter = ({ text, record, type, setTriggerReason }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const aggListLoading = useSelector(promoSetSelector.aggListLoading);
  const aggList = useSelector(promoSetSelector.aggList);

  const handleChange = value => {
    setTriggerReason('updateSelectFilter');
    dispatch(Creators.updatePromoSetTableData({ data: [{ ...record, [type]: value || '', is_updated: 1 }], affected: type }));
    dispatch(Creators.setUpdateList({}));
  };
  return (
    <Select
      allowClear
      showSearch
      className={classes.selectItem}
      defaultValue={text || null}
      onChange={handleChange}
      loading={aggListLoading}
      notFoundContent={(<p>{t('DATA_NOT_FOUND')}</p>)}
    >
      {aggList && Object.entries(aggList)?.map(value => (
        <Option key={value[1].id} value={value[1].promocode} label={value[1].promocode}>{value[1].promocode}</Option>
      ))}
    </Select>
  );
};
export default SelectFilter;

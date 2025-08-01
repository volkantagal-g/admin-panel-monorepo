import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SelectTitle from '@app/pages/MarketAutoGrowthOperations/components/SelectTitle';
import { promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';
import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

const { Option } = Select;

const PromoTypeFilter = ({ promoTypeList, disabled, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const selectedPromo = useSelector(promoSetSelector.selectedPromo);
  return (
    <>
      <SelectTitle src="promoType" description={t('PROMO_TYPE')} />
      <Select
        allowClear={false}
        showSearch
        className={classes.filterItem}
        onChange={value => dispatch(Creators.setSelectedPromoWarehouse({ selectedWarehouse: '', selectedPromo: value }))}
        placeholder={t('SELECT_PROMO_TYPE')}
        value={selectedPromo}
        disabled={disabled}
        loading={loading}
      >
        {promoTypeList && Object.entries(promoTypeList)?.map(value => (
          <Option key={value[0]} value={value[0]} label={value[0]} className={classes.promoOption}>
            <div className={value[1] ? classes.fullPromo : classes.emptyPromo} /> {value[0]}
          </Option>
        ))}
      </Select>
    </>
  );
};
export default PromoTypeFilter;

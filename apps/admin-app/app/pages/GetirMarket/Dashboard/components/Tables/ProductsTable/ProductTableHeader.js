import { Input, Typography, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { getProductTotalsDataSelector } from '../../../redux/selectors';
import { salesGroupType } from './constants';
import { percentFormatWithTwoDecimal } from '@shared/utils/localization';

const { Text } = Typography;

const HeaderButton = ({
  onSelectTableType,
  selectedTableType,
  groupType,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => onSelectTableType(groupType)}
      className={classes.button}
      type={selectedTableType.type === groupType.type && 'primary'}
      disabled={disabled}
    >
      {groupType.shortName}
    </Button>
  );
};

const ProductTableHeader = ({
  onSelectTableType,
  selectedTableType,
  onSearch,
  searchValue,
  disabled,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('getirMarketDashboardPage');
  const {
    totalAvailabilityExceptSupplierProblem,
    totalCustomerAvailability,
    totalCriticalAvailability,
  } = useSelector(getProductTotalsDataSelector);

  return (
    <div className={classes.headerContainer}>
      <div>
        <Input
          className={classes.searchInput}
          placeholder={t('globlal:SEARCH')}
          onChange={e => onSearch(e.target.value)}
          value={searchValue}
          disabled={disabled}
        />
      </div>
      <div className={classes.headerText}>
        <Tooltip title={t('TOTAL_AVAILABILITY_EXCEPT_SUPPLIER')}>
          <Text>{t('TOTAL_AVAILABILITY_EXCEPT_SUPPLIER_SHORT')}: </Text>
          <Text strong>
            {percentFormatWithTwoDecimal.format(totalAvailabilityExceptSupplierProblem)} ({percentFormatWithTwoDecimal.format(totalCustomerAvailability)})
          </Text>
        </Tooltip>
        <Tooltip title={t('TOTAL_CRITICAL_AVAILABILITY')}>
          <Text>{t('TOTAL_CRITICAL_AVAILABILITY_SHORT')}: </Text>
          <Text strong>{percentFormatWithTwoDecimal.format(totalCriticalAvailability)}</Text>
        </Tooltip>
      </div>
      <div className={classes.buttonContainer}>
        {
          Object.values(salesGroupType(t)).map(groupType => (
            <HeaderButton
              key={groupType.shortName}
              onSelectTableType={onSelectTableType}
              selectedTableType={selectedTableType}
              groupType={groupType}
              disabled={disabled}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ProductTableHeader;

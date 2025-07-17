import { Button } from '@shared/components/GUI';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import useStyles from './styles';

const SelectAllButton = ({ onClick, disabled, isAllSelected }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();

  return (
    <Button
      type="link"
      size="small"
      onClick={onClick}
      disabled={disabled}
      className={classes.selectAllButton}
    >
      {isAllSelected ? t('DESELECT_ALL') : t('SELECT_ALL')}
    </Button>
  );
};

export default SelectAllButton;

import { Button } from '@shared/components/GUI';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import useStyles from './styles';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>{t('ERROR_BOUNDARY.TITLE')}</h2>
      <p>{t('ERROR_BOUNDARY.DESCRIPTION')}</p>
      {error && <pre className={classes.error}>{error.message}</pre>}
      <Button color="primary" onClick={resetErrorBoundary}>
        {t('ERROR_BOUNDARY.TRY_AGAIN')}
      </Button>
    </div>
  );
};

export default ErrorFallback;

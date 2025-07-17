import { useTranslation } from 'react-i18next';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation('getirMarketLiveMapPage');

  return (
    <div role="alert">
      <p>{`${t('ERROR_TITLE')}: `}</p>
      <pre>{error.message}</pre>
    </div>
  );
};
export default ErrorFallback;

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Result } from 'antd';

function GenericNavigator({ to, shouldWait = true }: { to: string, shouldWait: boolean }) {
  const { t } = useTranslation(['global']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const msToWait = shouldWait ? 5000 : 0;

    const timeout = setTimeout(() => {
      navigate(`${to}?${queryParams.toString()}`);
    }, msToWait);

    return () => {
      clearInterval(timeout);
    };
  }, [location.search, navigate, shouldWait, to]);

  return (
    shouldWait ? (
      <Result
        className="mt-4"
        title={t('global:REDIRECT_TITLE')}
        subTitle={t('global:REDIRECT_SUBTITLE')}
      />
    ) : null
  );
}

export default GenericNavigator;

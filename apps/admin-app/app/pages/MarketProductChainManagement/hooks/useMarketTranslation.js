import { useTranslation } from 'react-i18next';

export const TRANSLATION_NAMESPACE = 'marketProductChainManagement';

export const useMarketTranslation = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  return { t };
};

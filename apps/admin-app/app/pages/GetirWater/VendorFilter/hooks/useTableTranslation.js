import { useTranslation } from 'react-i18next';

export default function useTableTranslation(tableKey) {
  const { t } = useTranslation('getirWaterVendorFilter');
  return (key, options = { isTableScoped: true }) => (options.isTableScoped ? t(`${tableKey}.${key}`) : t(key));
}

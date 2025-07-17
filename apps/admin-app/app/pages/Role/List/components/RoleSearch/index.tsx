import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const RoleSearch = ({ onSearch }: { onSearch: (searchInput: string) => void }) => {
  const { t } = useTranslation();

  return (
    <Input
      size="large"
      className="mb-2"
      placeholder={t('global:SEARCH')}
      onChange={event => {
        return onSearch(event.target.value as string);
      }}
    />
  );
};

export default RoleSearch;

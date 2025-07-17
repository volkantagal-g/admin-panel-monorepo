import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function DetailsButton({ id }) {
  const { t } = useTranslation('payoutSummaryPage');
  return (
    <a target="_blank" rel="noreferrer" href={`/tip/payback/payout-summary/detail/${id}`}>
      <Button type="default" size="small">
        {t('DETAILS')}
      </Button>
    </a>
  );
}

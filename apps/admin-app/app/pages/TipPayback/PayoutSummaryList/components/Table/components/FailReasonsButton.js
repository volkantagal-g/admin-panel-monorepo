import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function FailReasonButton({ id }) {
  const { t } = useTranslation('payoutSummaryPage');

  return (
    <a rel="noreferrer" target="blank" href={`/tip/payback/payout-summary/fail-reason/${id}`}>
      <Button type="default" size="small">
        {t('FAIL_REASONS')}
      </Button>
    </a>
  );
}

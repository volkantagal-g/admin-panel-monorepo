import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const InformationText = () => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  return (
    <div className={classes.competitionInformation}>
      {t('INFORMATION')}
    </div>
  );
};
export default InformationText;

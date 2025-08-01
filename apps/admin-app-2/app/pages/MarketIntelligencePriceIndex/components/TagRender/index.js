import { useTranslation } from 'react-i18next';

import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

const TagRender = ({ value }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  return COMPETITORS[value] ? (
    <>
      <img
        alt={t('COMPETITOR')}
        src={COMPETITORS[value][1]}
        className={classes.selectCompetitorImage}
      />
      &nbsp;
    </>
  )
    : (
      <>
        <img
          src={noPicture}
          alt={value}
          className={classes.priceIndexImage}
        />
        <span>{value}</span>
      </>
    );
};
export default TagRender;

import { useTranslation } from 'react-i18next';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

import { COMPETITORS } from '../../constants';
import useStyles from '../../styles';

const TagRender = ({ value }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

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

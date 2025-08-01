import { SELECT_TITLE_ICONS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const SelectTitle = ({ src, description, extra }) => {
  const classes = useStyles();
  return (
    <div
      data-testid="select-title"
      className={classes.selectTitle}
    >
      {' '}
      <img
        className={classes.selectTitleImage}
        alt={description}
        src={SELECT_TITLE_ICONS[src]}
      />{' '}
      {description}
      {extra}
    </div>
  );
};

export default SelectTitle;

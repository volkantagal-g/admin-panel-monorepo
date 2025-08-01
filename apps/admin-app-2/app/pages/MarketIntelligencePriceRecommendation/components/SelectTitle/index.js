import { SELECT_TITLE_ICONS } from '../../constants';

import useStyles from '../../styles';

const SelectTitle = ({ src, description }) => {
  const classes = useStyles();
  return (
    <div
      data-testid="select-title"
      className={classes.priceDiv}
    >
      {' '}
      <img
        className={classes.widthHeightvh}
        alt={description}
        src={SELECT_TITLE_ICONS[src]}
      />{' '}
      {description}
    </div>
  );
};
export default SelectTitle;

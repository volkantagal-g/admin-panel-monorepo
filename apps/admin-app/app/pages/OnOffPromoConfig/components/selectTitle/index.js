import { SELECT_TITLE_ICONS } from '../../constants';
import useStyles from '../../styles';

const SelectTitle = ({ src, description }) => {
  const classes = useStyles();
  return (
    <div
      data-testid="select-title"
      className={classes.selectTitle}
    >
      {' '}
      <img
        className={classes.selectTitleImg}
        alt={description}
        src={SELECT_TITLE_ICONS[src]}
      />{' '}
      {description}
    </div>
  );
};
export default SelectTitle;

import React from 'react';
import spinner from '@shared/assets/gifs/spinner.gif';
import useStyles from './styles';

const Spinner = () => {
  const classes = useStyles();
  return (
    <div data-testid="spinner-img" className={classes.verticalCenter}>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;

import { Button } from 'antd';

import useStyles from './styles';

const RedirectButton = ({ title, to }) => {
  const classes = useStyles();

  return (
    <a target="_blank" href={to} className={classes.container}>
      <Button type="primary">
        {title}
      </Button>
    </a>
  );
};

export default RedirectButton;

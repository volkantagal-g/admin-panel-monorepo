import { Typography } from 'antd';

import useStyles from './styles';

const { Paragraph } = Typography;

const Card = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paragraph className={classes.title}>{title}</Paragraph>
      {children}
    </div>
  );
};

export default Card;

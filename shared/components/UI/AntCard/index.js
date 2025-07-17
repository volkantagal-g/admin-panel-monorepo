import { Card } from 'antd';

import useStyles from './styles';

const AntCard = props => {
  const {
    footer,
    className = '',
    ...antCardProps
  } = props;
  const classes = useStyles();
  return (
    <>
      <div className={`${classes.wrapper} ${className} w-100`}>
        <Card key="Item-1" {...antCardProps} className={classes.card} />
        {footer && (
          <div key="Item-2" className={classes.cardFooter}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default AntCard;

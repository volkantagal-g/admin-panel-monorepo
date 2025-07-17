import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import useStyles from './FinancialOrderItem.styles';

const FinancialOrderItem = ({ label, amount, promoCode, promoId }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.label}>{label}</span>
      { !promoCode && <span className={classes.amount}>{amount}</span> }
      {
        promoCode && (
          <Link to={`/promo/detail/${promoId}`} target="_blank">
            <Tag color="green"> {promoCode} </Tag>
          </Link>
        )
      }
    </div>
  );
};

export default FinancialOrderItem;

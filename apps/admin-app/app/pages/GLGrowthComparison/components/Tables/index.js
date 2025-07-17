import { Row } from 'antd';

import PromoRatesTable from './PromoRatesTable';
import ClientOrderTable from './ClientOrderTable';
import useStyles from './styles';

const Tables = () => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <div>
        <PromoRatesTable />
      </div>
      <div>
        <ClientOrderTable />
      </div>
    </Row>
  );
};

export default Tables;

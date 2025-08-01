import { v4 as uuidv4 } from 'uuid';

import PaymentProviderIcon from '@shared/components/UI/PaymentProviderIcon';
import useStyles from './styles';

export default function PaymentProviderList({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.overflowList}>
      {
        data?.map(event => (
          <div key={uuidv4()}>
            <PaymentProviderIcon
              key={event._id}
              paymentProvider={event?.payment?.provider}
              paymentMethod={event.payment?.method}
              fitSize
            />
          </div>
        ))
      }
    </div>
  );
}

import { useSelector } from 'react-redux';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';
import { currencyFormat } from '@shared/utils/localization';

const useCurrency = () => {
  const orderISOCountryCode = useSelector(orderDetailSelector.getISOCountryCode);
  const { format } = currencyFormat({ currency: orderISOCountryCode });

  return { format };
};

export default useCurrency;

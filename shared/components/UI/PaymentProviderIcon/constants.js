import { PAYMENT_PROVIDERS } from '@shared/shared/constants';

import BkmIcon from '@shared/assets/paymentProviderIcons/bkm-express-icon.png';
import MasterpassIcon from '@shared/assets/paymentProviderIcons/mastercard-icon.png';
import GetirBNPL from '@shared/assets/paymentProviderIcons/getirbnpl_icon.png';
import GetirMoneyIcon from '@shared/assets/paymentProviderIcons/getir-money-icon.svg';
import AdyenIcon from '@shared/assets/paymentProviderIcons/adyen-icon.png';
import CheckoutIcon from '@shared/assets/paymentProviderIcons/checkout-icon.png';
import SmallSodexoIcon from '@shared/assets/paymentMethodIcons/small/small_sodexo_icon.png';
import TicketIcon from '@shared/assets/paymentMethodIcons/small/small_edenred_icon.png';
import MobilExpress from '@shared/assets/paymentMethodIcons/small/small_mobilexpress_icon.png';
import MultinetIcon from '@shared/assets/paymentMethodIcons/regular/multinet.svg';

export const PAYMENT_PROVIDER_ICON_SOURCES = {
  [PAYMENT_PROVIDERS.BKM]: BkmIcon,
  [PAYMENT_PROVIDERS.MASTERPASS]: MasterpassIcon,
  [PAYMENT_PROVIDERS.GETIR_MONEY]: GetirMoneyIcon,
  [PAYMENT_PROVIDERS.ADYEN]: AdyenIcon,
  [PAYMENT_PROVIDERS.CHECKOUT]: CheckoutIcon,
  [PAYMENT_PROVIDERS.SODEXO]: SmallSodexoIcon,
  [PAYMENT_PROVIDERS.TICKET]: TicketIcon,
  [PAYMENT_PROVIDERS.MOBILE_EXPRESS]: MobilExpress,
  [PAYMENT_PROVIDERS.MULTINET]: MultinetIcon,
  [PAYMENT_PROVIDERS.GETIRBNPL]: GetirBNPL,
};

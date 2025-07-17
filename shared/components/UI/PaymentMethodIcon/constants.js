import {
  PAYMENT_METHOD,
  PAYMENT_INFO_PAYMENT_METHOD_TYPES,
} from '@shared/shared/constants';

import BkmIcon from '@shared/assets/paymentMethodIcons/regular/bkm_icon.png';
import IstanbulCardIcon from '@shared/assets/paymentMethodIcons/regular/istanbul_card_icon.png';
import PayPalIcon from '@shared/assets/paymentMethodIcons/regular/paypal_icon.png';
import ApplePayIcon from '@shared/assets/paymentMethodIcons/regular/applepay_icon.png';
import SofortIcon from '@shared/assets/paymentMethodIcons/regular/sofort_icon.png';
import IdealIcon from '@shared/assets/paymentMethodIcons/regular/ideal_icon.png';
import CashIcon from '@shared/assets/paymentMethodIcons/regular/cash.svg';
import AmericanExpressIcon from '@shared/assets/paymentMethodIcons/regular/american-express-logo.svg';
import CreditIcon from '@shared/assets/paymentMethodIcons/regular/credit.svg';
import MetropolIcon from '@shared/assets/paymentMethodIcons/regular/metropol.svg';
import MultinetIcon from '@shared/assets/paymentMethodIcons/regular/multinet.svg';
import SodexoIcon from '@shared/assets/paymentMethodIcons/regular/sodexo.svg';
import TicketIcon from '@shared/assets/paymentMethodIcons/regular/ticket.svg';
import TroyIcon from '@shared/assets/paymentMethodIcons/regular/troy-logo.svg';
import MealCardIcon from '@shared/assets/paymentMethodIcons/regular/mealcard.png';
import GooglePayIcon from '@shared/assets/paymentMethodIcons/regular/googlepay.png';

import SmallApplePayIcon from '@shared/assets/paymentMethodIcons/small/small_applepay_icon.png';
import SmallCardSchemeIcon from '@shared/assets/paymentMethodIcons/small/small_card-scheme_icon.svg';
import SmallEdenRedIcon from '@shared/assets/paymentMethodIcons/small/small_edenred_icon.png';
import SmallIdealIcon from '@shared/assets/paymentMethodIcons/small/small_ideal_icon.png';
import SmallIstanbulCardIcon from '@shared/assets/paymentMethodIcons/small/small_istanbulcard_icon.png';
import SmallMobilExpressIcon from '@shared/assets/paymentMethodIcons/small/small_mobilexpress_icon.png';
import SmallPaypalIcon from '@shared/assets/paymentMethodIcons/small/small_paypal_icon.png';
import SmallSofortIcon from '@shared/assets/paymentMethodIcons/small/small_sofort_icon.png';
import SmallBkmIcon from '@shared/assets/paymentMethodIcons/small/small_bkm_icon.svg';
import GetirMoneyIcon from '@shared/assets/paymentProviderIcons/getir-money-icon.svg';
import SmallSodexoIcon from '@shared/assets/paymentMethodIcons/small/small_sodexo_icon.png';

const SMALL_ICONS = {
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.BKM]: SmallBkmIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.ISTANBUL_CARD]: SmallIstanbulCardIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.PAYPAL]: SmallPaypalIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.APPLE_PAY]: SmallApplePayIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.SOFORT]: SmallSofortIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.IDEAL]: SmallIdealIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.SODEXO]: SmallSodexoIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.TICKET]: SmallEdenRedIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.SCHEME]: SmallCardSchemeIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.MOBILE_EXPRESS]: SmallMobilExpressIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.LOYALTY_POINTS]: GetirMoneyIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.MEAL_CARD]: MealCardIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.GOOGLE_PAY]: GooglePayIcon,
};

const REGULAR_ICONS = {
  [PAYMENT_METHOD.BKM]: BkmIcon,
  [PAYMENT_METHOD.ISTANBUL_CARD]: IstanbulCardIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.PAYPAL]: PayPalIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.APPLE_PAY]: ApplePayIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.SOFORT]: SofortIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.IDEAL]: IdealIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.AMERICAN_EXPRESS]: IdealIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.AMERICAN_EXPRESS]: AmericanExpressIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.CASH]: CashIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.CREDIT]: CreditIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.METROPOL]: MetropolIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.MULTINET]: MultinetIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.SODEXO]: SodexoIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.TICKET]: TicketIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.TROY]: TroyIcon,
  [PAYMENT_INFO_PAYMENT_METHOD_TYPES.GOOGLE_PAY]: GooglePayIcon,
};

export const PAYMENT_METHOD_ICON_SOURCES = (isIconSmall = false) => {
  return isIconSmall ? SMALL_ICONS : REGULAR_ICONS;
};

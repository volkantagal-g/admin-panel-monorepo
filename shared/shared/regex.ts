import { COUNTRIES_DIALING_CODE } from './constants';

export const REGEX = {
  PHONE: /^[0-9]{9,15}$/,
  TAX_NUMBER: /^[0-9]{9,12}$/,
  TAX_NUMBER_ALPHANUMERICAL: /^[a-zA-Z0-9]+$/,
  ACCOUNT_NUMBER: {
    [COUNTRIES_DIALING_CODE.US]: /^[0-9]{8,12}$/,
    [COUNTRIES_DIALING_CODE.GB]: /^(\d){7,8}$/,
  },
  ROUTING_NUMBER: /^[0-9]{9}$/,
  SORT_CODE: /^[0-9]{2}-[0-9]{2}-[0-9]{2}$/,
  // Email cannot contain:
  // - Two consecutive dots: ..
  // - Two consecutive @ symbols: @.*@
  // - . before @: .@
  // - @ before .: @.
  // - @ followed by a hyphen: @-
  // Email cannot end with a dot: \.$
  // Email cannot start with a dot: ^\.
  // Email cannot contain invalid characters: [<>()[\]\\.,;:\s@"]
  // Email must end with .com (in lowercase)
  EMAIL: /^(?!.*(\.\.|@.*@|\.@|@\.|@-|\.$|^\.)|[@<>()[\]\\.,;:\s@"])(?!.*\.\.)([A-Za-z0-9._%+-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.(com|tech)$/,
  // Email must end with .com, .edu or .edu.xx (in lowercase)
  PERSONAL_EMAIL:
    /^(?!.*(\.\.|@.*@|\.@|@\.|@-|\.$|^\.)|[@<>()[\]\\.,;:\s@"])(?!.*\.\.)([A-Za-z0-9._%+-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}(\.[A-Za-z]{2})?$/,
};

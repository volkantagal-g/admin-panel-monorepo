import { REQUEST_TYPE } from '../constants';
import AllShopsForm from './AllShopsForm';
import SingleShopForm from './SingleShopForm';
import PartialShopsForm from './PartialShopsForm';

export const FORMS = {
  [REQUEST_TYPE.SINGLE_SHOP]: SingleShopForm,
  [REQUEST_TYPE.ALL_SHOPS]: AllShopsForm,
  [REQUEST_TYPE.EXPORT_SHOPS]: PartialShopsForm,
};

import Loadable from '@shared/utils/loadable';
import { SPINNER } from '@shared/shared/constants';

export const Header = Loadable(() => {
  return import('./Header');
});

export const HomeAddress = Loadable(() => {
  return import('./HomeAddress');
}, SPINNER.EMPTY);

export const GeneralInformation = Loadable(() => {
  return import('./GeneralInformation');
}, SPINNER.EMPTY);

export const RelativeInformation = Loadable(() => {
  return import('./RelativeInformation');
}, SPINNER.EMPTY);

export const CreateCourier = Loadable(() => {
  return import('./CreateCourier');
}, SPINNER.EMPTY);

export const Footer = Loadable(() => {
  return import('./Footer');
});

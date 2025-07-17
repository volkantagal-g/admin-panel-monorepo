import Loadable from '@shared/utils/loadable';

export const Footer = Loadable(() => {
  return import('./Footer');
});

export const UploadImage = Loadable(() => {
  return import('./UploadImage');
});

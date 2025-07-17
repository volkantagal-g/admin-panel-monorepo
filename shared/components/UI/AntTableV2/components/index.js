import Loadable from '@shared/utils/loadable';

const Footer = Loadable(() => {
  return import('./Footer');
});
const Header = Loadable(() => {
  return import('./Header');
});

export { Footer, Header };

import { Helmet } from 'react-helmet';

const PageTitleHeader = ({ title, isDeviceMobile = false }) => (
  <Helmet>
    {
      isDeviceMobile ? <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> : null
    }
    <title>{title}</title>
  </Helmet>
);

export default PageTitleHeader;

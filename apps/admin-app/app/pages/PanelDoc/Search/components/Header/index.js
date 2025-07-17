import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';

const Header = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageHeader
        className="p-0 page-title"
        title={title}
      />
    </>
  );
};

export default Header;

import { PageHeader } from 'antd';
import { memo } from 'react';
import { Helmet } from 'react-helmet';

const Header = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        title={title}
        className="p-0 page-title"
      />
    </>
  );
};

export default memo(Header);

import { PageHeader } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = ({ title }) => {
  return (
    <>
      <PageTitleHeader title={title} />
      <PageHeader
        className="p-0 page-title"
        title={title}
      />
    </>
  );
};

export default Header;

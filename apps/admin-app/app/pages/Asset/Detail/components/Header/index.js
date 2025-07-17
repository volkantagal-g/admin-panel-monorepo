import { PageHeader } from 'antd';

const AssetDetailHeader = ({ heading }) => {
  return (
    <PageHeader
      className="p-0 user-title"
      title={heading}
    />
  );
};

export default AssetDetailHeader;

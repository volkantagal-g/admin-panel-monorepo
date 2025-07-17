import { Row, Typography } from 'antd';

import permKey from '@shared/shared/permKey.json';
import NewButton from '@app/pages/FieldAnnouncement/components/NewButton';
import { usePermission } from '@shared/hooks';

const { Title } = Typography;

const PageHeader = ({ pageTitle }) => {
  const { Can } = usePermission();

  return (
    <Row justify="space-between" align="middle">
      <Title level={3}>{pageTitle}</Title>
      <Can permKey={permKey.PAGE_FIELD_ANNOUNCEMENT_CREATE}>
        <NewButton />
      </Can>
    </Row>
  );
};

export default PageHeader;

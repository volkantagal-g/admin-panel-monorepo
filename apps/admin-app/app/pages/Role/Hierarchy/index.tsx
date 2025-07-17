import { useTranslation } from 'react-i18next';

import { Col, PageHeader, Row } from 'antd';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Graph } from './components';

const RoleHierarchyPage = () => {
  usePageViewAnalytics({ name: ROUTE.ROLE_HIERARCHY.name, squad: ROUTE.ROLE_HIERARCHY.squad });
  const { t } = useTranslation('rolePage');

  return (
    <>
      <Row gutter={8}>
        <Col flex={1}>
          <PageHeader
            className="p-0 role-title"
            title={t('global:PAGE_TITLE.ROLE.HIERARCHY')}
          />
        </Col>
      </Row>
      <Graph />
    </>
  );
};

export default RoleHierarchyPage;

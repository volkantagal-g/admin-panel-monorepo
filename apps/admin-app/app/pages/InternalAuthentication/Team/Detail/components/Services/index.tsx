import { Button, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';

import { teamServicesSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import NewServiceModal from '../NewServiceModal';

const { Text } = Typography;

const Services = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const { Can } = usePermission();

  const teamServices = useSelector(teamServicesSelector.getData);
  const teamServicesPending = useSelector(teamServicesSelector.getIsPending);

  const [newServiceModalVisible, setNewServiceModalVisible] = useState(false);

  const title = (
    <Row justify="start" align="middle" className="w-100">
      <Col>
        <Text>{t('REPOSITORIES_OWNED_BY_THE_TEAM')}</Text>
      </Col>
      <Col className="ml-auto">
        <Button
          type="primary"
          onClick={() => setNewServiceModalVisible(true)}
        >{t('CREATE_NEW_REPOSITORY')}
        </Button>
      </Col>
    </Row>
  );
  return (
    <>
      <AntCard title={title}>
        <AntTableV2 columns={tableColumns({ t, Can })} data={teamServices} loading={teamServicesPending} />
      </AntCard>
      {newServiceModalVisible && <NewServiceModal setVisible={setNewServiceModalVisible} />}
    </>
  );
};

export default Services;

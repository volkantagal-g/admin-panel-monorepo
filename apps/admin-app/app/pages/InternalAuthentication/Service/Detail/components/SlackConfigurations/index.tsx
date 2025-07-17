import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { Creators } from '../../redux/actions';
import { slackConfigurationSelector, updateSlackConfigurationSelector } from '../../redux/selectors';
import { getDMtableColumns, tableColumns } from './config';
import AddChannelModal from '../AddChannelModal';
import EditChannelModal from '../EditChannelModal';
import SlackIntegrationInfoModal from '../SlackIntegrationInfoModal';
import GenerateSlackTokenModal from '../GenerateSlackTokenModal';
import AddDMConfigModal from '../AddDMConfigModal';
import EditDMConfigModal from '../EditDMConfigModal';

const { Text } = Typography;

const SlackConfigurations = () => {
  const { t } = useTranslation(['internalAuthentication', 'global']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const slackConfigurations = useSelector(slackConfigurationSelector.getData);
  const slackConfigurationsPending = useSelector(slackConfigurationSelector.getIsPending);
  const updateSlackConfigurationsPending = useSelector(updateSlackConfigurationSelector.getIsPending);
  const isPending = slackConfigurationsPending || updateSlackConfigurationsPending;

  const [addChannelModalVisible, setAddChannelModalVisible] = useState(false);
  const [editChannelModalVisible, setEditChannelModalVisible] = useState(false);
  const [addDMConfigModalVisible, setAddDMConfigModalVisible] = useState(false);
  const [editDMConfigModalVisible, setEditDMConfigModalVisible] = useState(false);
  const [slackIntegrationInfoModalVisible, setSlackIntegrationInfoModalVisible] = useState(false);
  const [selectedSlackConfigs, setSelectedSlackConfigs] = useState({ channelName: '', dm: '', workspaceName: '' });
  const [editingChannelIndex, setEditingChannelIndex] = useState(0);
  const [editingDMConfigIndex, setEditingDMConfigIndex] = useState(0);
  const [generateTokenModalVisible, setGenerateTokenModalModalVisible] = useState(false);
  const { teamId, serviceId } = useParams();

  const hasGeneratedToken = slackConfigurations?.isTokenGenerated;

  const onEdit = (index: number) => {
    setEditChannelModalVisible(true);
    setEditingChannelIndex(index);
  };
  const onDelete = (index: number) => {
    const workspaceChannelNamePairs = slackConfigurations.workspaceChannelNamePairs.map(p => ({
      channelName: p.channelName,
      workspaceName: p.workspaceName,
    }));

    dispatch(Creators.updateSlackConfigurationsRequest({
      teamId,
      serviceId,
      workspaceChannelNamePairs: workspaceChannelNamePairs.toSpliced(index, 1),
    }));
  };
  const onTestClick = ({ channelName, dm, workspaceName }: { channelName?: string, dm?: string, workspaceName: string }) => {
    setSelectedSlackConfigs({ channelName: channelName!, dm: dm!, workspaceName });
    dispatch(Creators.testSlackMessage({
      teamId,
      serviceId,
      channelName,
      dm,
      workspaceName,
    }));
    setSlackIntegrationInfoModalVisible(true);
  };
  const onDMEdit = (index: number) => {
    setEditDMConfigModalVisible(true);
    setEditingDMConfigIndex(index);
  };
  const onDMDelete = (index: number) => {
    const workspaceDMConfigPairs = slackConfigurations.workspaceDMConfigPairs.map(p => ({
      isDMEnabled: !!p.isDMEnabled,
      workspaceName: p.workspaceName,
    }));

    dispatch(Creators.updateSlackConfigurationsRequest({
      teamId,
      serviceId,
      workspaceDMConfigPairs: workspaceDMConfigPairs.toSpliced(index, 1),
    }));
  };

  const title = (
    <Row justify="start" align="middle" className="w-100">
      <Col>
        <Text>{t('SLACK_CONFIGURATIONS')}</Text>
      </Col>
      <Col className="ml-auto">
        <Can permKey={permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_DETAIL_COMPONENT_GENERATE_TOKEN}>
          <Button
            type="primary"
            disabled={isPending}
            onClick={() => {
              setGenerateTokenModalModalVisible(true);
              if (!hasGeneratedToken) {
                dispatch(Creators.generateSlackTokenRequest({
                  teamId,
                  serviceId,
                  failureCallback: () => setGenerateTokenModalModalVisible(false),
                }));
              }
            }}
          >
            {t('GENERATE_TOKEN')}
          </Button>
        </Can>
      </Col>
    </Row>
  );

  const dmMessageTitle = (
    <Row justify="start" align="middle" className="w-100">
      <Col>
        <Text>{t('DM_MESSAGES')}</Text>
      </Col>
      <Col className="ml-auto">
        <Tooltip title={!hasGeneratedToken ? t('GENERATE_TOKEN_FIRST') : undefined}>
          <Button
            type="default"
            disabled={isPending || !hasGeneratedToken || slackConfigurations?.workspaceDMConfigPairs?.length >= 2}
            onClick={() => setAddDMConfigModalVisible(true)}
          >{t('ADD_DM_CONFIG')}
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );

  const channelMessageTitle = (
    <Row justify="start" align="middle" className="w-100">
      <Col>
        <Text>{t('CHANNEL_MESSAGES')}</Text>
      </Col>
      <Col className="ml-auto">
        <Tooltip title={!hasGeneratedToken ? t('GENERATE_TOKEN_FIRST') : undefined}>
          <Button
            type="default"
            disabled={isPending || !hasGeneratedToken}
            onClick={() => setAddChannelModalVisible(true)}
          >{t('ADD_CHANNEL')}
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );

  return (
    <>
      {addChannelModalVisible && <AddChannelModal onClose={() => setAddChannelModalVisible(false)} />}
      {editChannelModalVisible && <EditChannelModal index={editingChannelIndex} onClose={() => setEditChannelModalVisible(false)} />}
      {addDMConfigModalVisible && <AddDMConfigModal onClose={() => setAddDMConfigModalVisible(false)} />}
      {editDMConfigModalVisible && <EditDMConfigModal index={editingDMConfigIndex} onClose={() => setEditDMConfigModalVisible(false)} />}
      {
        slackIntegrationInfoModalVisible &&
        (
          <SlackIntegrationInfoModal
            onClose={() => setSlackIntegrationInfoModalVisible(false)}
            channelName={selectedSlackConfigs.channelName}
            dm={selectedSlackConfigs.dm}
            workspaceName={selectedSlackConfigs.workspaceName}
          />
        )
      }
      {generateTokenModalVisible && (
        <GenerateSlackTokenModal
          slackToken={slackConfigurations?.accessToken}
          onClose={() => setGenerateTokenModalModalVisible(false)}
        />
      )}
      <AntCard title={title}>
        <AntCard title={channelMessageTitle}>
          <AntTableV2
            columns={tableColumns({ t, onEdit, onDelete, onTestClick })}
            loading={isPending}
            data={slackConfigurations?.workspaceChannelNamePairs ?? []}
          />
        </AntCard>
        <AntCard title={dmMessageTitle}>
          <AntTableV2
            columns={getDMtableColumns({ t, onEdit: onDMEdit, onDelete: onDMDelete, onTestClick })}
            loading={isPending}
            data={slackConfigurations?.workspaceDMConfigPairs ?? []}
          />
        </AntCard>
      </AntCard>
    </>
  );
};

export default SlackConfigurations;

import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Button, Tooltip, Space, Row, Col, Badge, Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get, isEmpty } from 'lodash';

import {
  thirdPartyCompanyCredentialEnvironmentsByStrings,
  thirdPartyCompanyStatuses,
} from '@app/pages/ThirdPartyCompany/constantValues';
import {
  THIRD_PARTY_COMPANY_CREDENTIAL_ENVIRONMENTS as credentialEnvs,
  THIRD_PARTY_COMPANY_STATUSES,
} from '@app/pages/ThirdPartyCompany/constants';
import { getLangKey } from '@shared/i18n';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import AntCard from '@shared/components/UI/AntCard';

import { Creators } from '@app/pages/ThirdPartyCompany/Detail/redux/actions';
import {
  deleteCredentialByCompanyAndCredentialIdSelector,
  activateCredentialByCompanyAndCredentialIdSelector,
  deactivateCredentialByCompanyAndCredentialIdSelector,
  generateCredentialSignatureByCredentialIdSelector,
} from '@app/pages/ThirdPartyCompany/Detail/redux/selectors';
import useInterval from '@shared/shared/hooks/useInterval';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const langKey = getLangKey();
const { Meta } = Card;
const { Paragraph, Text, Title } = Typography;

const LOCAL_STATEMENTS = {
  NOT_APPLICABLE: 'N/A',
  EMPTY: '',
};
const LOCAL_VARIABLES = {
  MAX_SIGNATURE_DISPLAY_SEC: 10,
  SIGNATURE_DISPLAY_STOP_SEC: 0,
  SIGNATURE_DISPLAY_INTERVAL_MSEC: 1000,
  SIGNATURE_DISPLAY_REDUCE_BY_SEC: 1,
};

const CredentialCard = ({
  environment = thirdPartyCompanyCredentialEnvironmentsByStrings[credentialEnvs.DEV]?.[langKey],
  credentialId,
  status,
  credentialLabel,
  secret = LOCAL_STATEMENTS.EMPTY,
}) => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const dispatch = useDispatch();
  const { id: companyId } = useParams();
  const avatarText = thirdPartyCompanyCredentialEnvironmentsByStrings[environment]?.[langKey] || LOCAL_STATEMENTS.NOT_APPLICABLE;
  const isCredentialActive = status === THIRD_PARTY_COMPANY_STATUSES.ACTIVE;
  const { Can, canAccess } = usePermission();
  const [signature, setSignature] = useState(secret);
  const [displayTimer, setDisplayTimer] = useState(LOCAL_VARIABLES.MAX_SIGNATURE_DISPLAY_SEC);

  const isGenerateCredentialSignatureByCredentialIdPending = useSelector(generateCredentialSignatureByCredentialIdSelector.getIsPending);
  const generateCredentialSignatureByCredentialIdData = useSelector(generateCredentialSignatureByCredentialIdSelector.getData);
  const isDeleteCredentialByCompanyAndCredentialIdPending = useSelector(deleteCredentialByCompanyAndCredentialIdSelector.getIsPending);
  const isActivateCredentialByCompanyAndCredentialIdPending = useSelector(activateCredentialByCompanyAndCredentialIdSelector.getIsPending);
  const isdeactivateCredentialByCompanyAndCredentialIdPending = useSelector(deactivateCredentialByCompanyAndCredentialIdSelector.getIsPending);
  const isCardActionPending = isDeleteCredentialByCompanyAndCredentialIdPending ||
    isActivateCredentialByCompanyAndCredentialIdPending ||
    isdeactivateCredentialByCompanyAndCredentialIdPending;
  const isEligibleToEditCompanyCredentials = canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_EDIT_CREDENTIALS);

  const refreshDisplayTimer = useCallback(() => {
    setDisplayTimer(displayTimer - LOCAL_VARIABLES.SIGNATURE_DISPLAY_REDUCE_BY_SEC);
  }, [displayTimer]);

  const deleteCredential = useCallback(() => {
    dispatch(Creators.deleteCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }));
  }, [companyId, credentialId, dispatch]);
  const { debouncedCallback: handleDeleteCredential } = useDebouncedCallback({
    callback: deleteCredential,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const activateCredential = useCallback(() => {
    dispatch(Creators.activateCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }));
  }, [companyId, credentialId, dispatch]);
  const { debouncedCallback: handleActivateCredential } = useDebouncedCallback({
    callback: activateCredential,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const deactivateCredential = useCallback(() => {
    dispatch(Creators.deactivateCredentialByCompanyAndCredentialIdRequest({ companyId, credentialId }));
  }, [companyId, credentialId, dispatch]);
  const { debouncedCallback: handleDeactivateCredential } = useDebouncedCallback({
    callback: deactivateCredential,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const generateCredential = useCallback(() => {
    dispatch(Creators.generateCredentialSignatureByCredentialIdRequest({ credentialId }));
  }, [credentialId, dispatch]);
  const { debouncedCallback: handleGenerateCredential } = useDebouncedCallback({
    callback: generateCredential,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  useEffect(() => {
    const receivedSignature = get(generateCredentialSignatureByCredentialIdData
      .find(generatedSignature => generatedSignature.credentialId === credentialId), 'signature', LOCAL_STATEMENTS.EMPTY);

    if (!isEmpty(receivedSignature)) {
      setSignature(receivedSignature);
    }
    else {
      setSignature(LOCAL_STATEMENTS.EMPTY);
    }
  }, [credentialId, generateCredentialSignatureByCredentialIdData]);

  useEffect(() => {
    if (isCardActionPending) {
      setSignature(LOCAL_STATEMENTS.EMPTY);
      dispatch(Creators.generateCredentialSignatureByCredentialIdClear({ credentialId }));
    }
  }, [credentialId, dispatch, isCardActionPending]);

  useInterval(() => {
    if (!isCardActionPending && !isEmpty(signature) && displayTimer >= LOCAL_VARIABLES.SIGNATURE_DISPLAY_STOP_SEC) {
      refreshDisplayTimer();
    }
  }, LOCAL_VARIABLES.SIGNATURE_DISPLAY_INTERVAL_MSEC);

  useEffect(() => {
    if (displayTimer === 0) {
      setSignature(LOCAL_STATEMENTS.EMPTY);
      dispatch(Creators.generateCredentialSignatureByCredentialIdClear({ credentialId }));
      setDisplayTimer(LOCAL_VARIABLES.MAX_SIGNATURE_DISPLAY_SEC);
    }
  }, [credentialId, dispatch, displayTimer]);

  const activateActions = {
    checked: useMemo(() => {
      return (
        <Tooltip title={t('PAGE.DETAIL.ACTIVATE_CREDENTIAL')}>
          <Button
            icon={<CheckOutlined />}
            disabled={!isEligibleToEditCompanyCredentials}
            onClick={handleActivateCredential}
          >
            {t('BUTTONS.ACTIVATE')}
          </Button>
        </Tooltip>
      );
    }, [handleActivateCredential, isEligibleToEditCompanyCredentials, t]),
    unchecked: useMemo(() => {
      return (
        <Tooltip title={t('PAGE.DETAIL.DEACTIVATE_CREDENTIAL')}>
          <Button
            icon={<CloseOutlined />}
            disabled={!isEligibleToEditCompanyCredentials}
            onClick={handleDeactivateCredential}
          >
            {t('BUTTONS.INACTIVATE')}
          </Button>
        </Tooltip>
      );
    }, [handleDeactivateCredential, isEligibleToEditCompanyCredentials, t]),
  };

  const getActivationActions = () => {
    return isCredentialActive ? activateActions.unchecked : activateActions.checked;
  };

  const handleShowCredentialLogsButtonClick = () => {
    dispatch(Creators.companyCredentialChangeLogClicked({ credentialKey: credentialLabel }));
  };

  const metaTitle = () => {
    return (
      <>
        <Row>
          <Col>
            <Space>
              <span>{credentialLabel}</span>
              {!secret && (
                <>
                  <Tooltip
                    title={!isCredentialActive ? t('PAGE.DETAIL.CANNOT_GENERATE_SIGNATURE') : false}
                  >
                    <Button
                      key={`${credentialLabel}_GENERATE_SIGNATURE_BUTTON`}
                      loading={isGenerateCredentialSignatureByCredentialIdPending}
                      disabled={!isCredentialActive || !isEmpty(signature) || !isEligibleToEditCompanyCredentials}
                      onClick={handleGenerateCredential}
                    >
                      {t('PAGE.DETAIL.GENERATE_SIGNATURE')}
                    </Button>
                  </Tooltip>
                  <Can
                    key={`${credentialLabel}_SHOW_LOGS_BUTTON`}
                    permKey={permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_VIEW_CREDENTIALS}
                  >
                    <Button
                      loading={isGenerateCredentialSignatureByCredentialIdPending}
                      onClick={handleShowCredentialLogsButtonClick}
                    >
                      {t('thirdPartyCompany:SHOW_LOGS')}
                    </Button>
                  </Can>
                </>
              )}
            </Space>
          </Col>
        </Row>
        <Row>
          {signature && (
            <Col>
              <Space direction="vertical" size="small">
                <Divider orientation="left">
                  <Tooltip title={t('PAGE.DETAIL.SIGNATURE_DISPLAY_WARNING', { displayTimer })}>
                    <Badge count={displayTimer} offset={[20, 5]}>
                      <Text>{t('PAGE.DETAIL.SIGNATURE')}</Text>
                    </Badge>
                  </Tooltip>
                </Divider>
                <Paragraph code copyable={{ tooltips: [t('PAGE.DETAIL.COPY'), t('PAGE.DETAIL.COPIED')] }}>{signature}</Paragraph>
              </Space>
            </Col>
          )}
        </Row>
      </>
    );
  };

  return (
    <AntCard
      actions={[
        <Tooltip title={t('PAGE.DETAIL.DELETE_CREDENTIAL')}>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={!isEligibleToEditCompanyCredentials}
            onClick={handleDeleteCredential}
          >
            {t('BUTTONS.DELETE')}
          </Button>
        </Tooltip>,
        getActivationActions(),
      ]}
    >
      <Skeleton loading={isCardActionPending}>
        <Title level={5}>{t('thirdPartyCompany:PAGE.DETAIL.ENVIRONMENT_KEY')}</Title>
        <Meta
          avatar={<Avatar size={40}>{avatarText}</Avatar>}
          title={metaTitle({ credentialLabel, credentialId, secret })}
          description={`${thirdPartyCompanyStatuses[status][langKey]}`}
        />
      </Skeleton>
    </AntCard>
  );
};

export default CredentialCard;

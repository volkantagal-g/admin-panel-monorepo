// library imports
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Select } from 'antd';

// shared imports
import { getLangKey } from '@shared/i18n';
import AntCard from '@shared/components/UI/AntCard';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

// local imports
import { thirdPartyCompanyCredentialEnvironments } from '@app/pages/ThirdPartyCompany/constantValues';
import { Creators } from '@app/pages/ThirdPartyCompany/Detail/redux/actions';
import { createCredentialByCompanyIdSelector } from '@app/pages/ThirdPartyCompany/Detail/redux/selectors';

// constants
const MIN_CREDENTIAL_ENV_LENGTH = 3;
const { Option } = Select;
const langKey = getLangKey();

const NewCredential = () => {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const [environment, setEnvironment] = useState('');
  const isCreateCredentialByCompanyIdPending = useSelector(createCredentialByCompanyIdSelector.getIsPending);
  const isEligibleToEditCompanyCredentials = canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_EDIT_CREDENTIALS);

  const handleChange = value => {
    setEnvironment(value);
  };

  const isValidEnvironment = useCallback(() => {
    return environment && environment.trim().length >= MIN_CREDENTIAL_ENV_LENGTH;
  }, [environment]);

  const handleSendNewCredential = useCallback(() => {
    if (!isValidEnvironment()) return;
    dispatch(Creators.createCredentialByCompanyIdRequest({ id, environment }));
  }, [dispatch, environment, id, isValidEnvironment]);

  const cardFooter = (
    <Row justify="end">
      <Button
        size="small"
        type="primary"
        loading={isCreateCredentialByCompanyIdPending}
        onClick={handleSendNewCredential}
        disabled={!isValidEnvironment() || !isEligibleToEditCompanyCredentials}
      >
        {t('button:SAVE')}
      </Button>
    </Row>
  );

  return (
    <AntCard
      title={t('PAGE.DETAIL.NEW_CREDENTIAL')}
      footer={cardFooter}
    >
      <Row>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            placeholder={t('PAGE.DETAIL.NEW_CREDENTAL_PLACEHOLDER')}
            onChange={handleChange}
          >
            {Object.values(thirdPartyCompanyCredentialEnvironments).map(credentialEnvironment => {
              return (
                <Option
                  key={credentialEnvironment[langKey]}
                  value={credentialEnvironment[langKey]}
                >
                  {capitalize(`${credentialEnvironment[langKey]}`)}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
    </AntCard>
  );
};

export default NewCredential;

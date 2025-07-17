import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { getCredentialsByCompanyIdSelector } from '@app/pages/ThirdPartyCompany/Detail/redux/selectors';
import CredentialCard from '../CredentialCard';

const CredentialList = () => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const thirdPartyCompanyCredentials = useSelector(getCredentialsByCompanyIdSelector.getData);
  return (
    <AntCard
      title={t('PAGE.DETAIL.CREDENTIALS')}
    >
      <div>
        {thirdPartyCompanyCredentials && thirdPartyCompanyCredentials.secrets?.map(credential => {
          return (
            <CredentialCard
              key={credential._id}
              status={credential.status}
              credentialId={credential._id}
              credentialLabel={credential.key}
              environment={credential.environment}
              secret={credential.secret || ''}
            />
          );
        })}
      </div>
    </AntCard>
  );
};

export default CredentialList;

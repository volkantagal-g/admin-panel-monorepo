import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { toast } from 'react-toastify';

import CsvImporter from '@shared/components/UI/CsvImporter';

import { Creators } from '../../redux/actions';
import { bulkInactivateExternalCustomerServicesAccountsSelector } from '../../redux/selectors';
import BulkResultViewer from '../BulkResultViewer';
import { bulkInactivationTranslationKeys } from '../BulkResultViewer/constants';

export const exampleCsv = { email: 'name.surname@concentrix.getir.com' };

const ALLOWED_SUBDOMAINS = [
  'webhelp.getir.com',
  'concentrix.getir.com',
  'teleperformance.getir.com',
  'assistt.getir.com',
];

const ALLOWED_SUBDOMAINS_SET = new Set(ALLOWED_SUBDOMAINS);

const validateCSVData = data => {
  let isFormatValid = true;
  let hasCorrectMailSubdomains = true;
  for (let i = 0; i < data.length; i += 1) {
    const row = data[i];
    const email = row?.email;
    if (!email) {
      isFormatValid = false;
      break;
    }
    const splittedEmail = email.split('@');
    if (splittedEmail.length !== 2) {
      isFormatValid = false;
      break;
    }
    const [, subdomain] = splittedEmail;
    if (!ALLOWED_SUBDOMAINS_SET.has(subdomain)) {
      hasCorrectMailSubdomains = false;
      break;
    }
  }
  return {
    isFormatValid,
    hasCorrectMailSubdomains,
  };
};

const ExternalCustomerServicesPanelAccountsBulkInactivate = () => {
  const { t } = useTranslation(['externalCustomerServicesPanelAccountManagementPage']);
  const dispatch = useDispatch();

  const bulkInactivateExternalCustomerServicesAccountsData = useSelector(bulkInactivateExternalCustomerServicesAccountsSelector.getData);
  const bulkInactivateExternalCustomerServicesAccountsIsPending = useSelector(bulkInactivateExternalCustomerServicesAccountsSelector.getIsPending);
  const bulkInactivateExternalCustomerServicesAccountsDataIsRequested = useSelector(bulkInactivateExternalCustomerServicesAccountsSelector.getIsRequested);
  const bulkInactivateExternalCustomerServicesAccountsDataError = useSelector(bulkInactivateExternalCustomerServicesAccountsSelector.getError);

  const handleBulkInactivationImport = ({ data }) => {
    const { isFormatValid, hasCorrectMailSubdomains } = validateCSVData(data);
    if (!isFormatValid) {
      toast.error(t('externalCustomerServicesPanelAccountManagementPage:ERROR_INVALID_CSV_FORMAT'));
      return;
    }
    if (!hasCorrectMailSubdomains) {
      toast.error(t('externalCustomerServicesPanelAccountManagementPage:ERROR_INCORRECT_MAIL_SUBDOMAIN'));
      return;
    }
    const mailAddressList = data.map(({ email }) => email);
    dispatch(Creators.bulkInactivateExternalCustomerServicesAccountsRequest({ mailAddressList }));
  };

  return (
    <Card
      title={t('externalCustomerServicesPanelAccountManagementPage:BULK_INACTIVATION')}
      extra={(
        <CsvImporter
          onOkayClick={handleBulkInactivationImport}
          exampleCsv={exampleCsv}
          exampleTableProps={{ rowKey: 'email' }}
        />
      )}
    >
      {bulkInactivateExternalCustomerServicesAccountsDataIsRequested && (
        <BulkResultViewer
          isPending={bulkInactivateExternalCustomerServicesAccountsIsPending}
          data={bulkInactivateExternalCustomerServicesAccountsData}
          error={bulkInactivateExternalCustomerServicesAccountsDataError?.message
            ?? bulkInactivateExternalCustomerServicesAccountsDataError.error}
          translations={bulkInactivationTranslationKeys}
        />
      )}
    </Card>
  );
};

export default ExternalCustomerServicesPanelAccountsBulkInactivate;

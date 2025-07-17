import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CsvImporter from '@shared/components/UI/CsvImporter';

import { Creators } from '../../redux/actions';
import { bulkCreateTeleperformanceUsersSelector } from '../../redux/selectors';
import BulkResultViewer from '../BulkResultViewer';
import { bulkCreateOrUpdateTranslationKeys } from '../BulkResultViewer/constants';
import { getExampleCsv } from '@app/pages/User/ExternalCustomerServicesPanelAccountManagement/utils';

const TeleperformanceUserCreation = () => {
  const { t } = useTranslation(['global', 'externalCustomerServicesPanelAccountManagementPage']);
  const dispatch = useDispatch();

  const data = useSelector(bulkCreateTeleperformanceUsersSelector.getData);
  const isPending = useSelector(bulkCreateTeleperformanceUsersSelector.getIsPending);
  const isRequested = useSelector(bulkCreateTeleperformanceUsersSelector.getIsRequested);
  const error = useSelector(bulkCreateTeleperformanceUsersSelector.getError);

  const handleBulkImport = ({ data: users }) => {
    dispatch(Creators.bulkCreateTeleperformanceUsersRequest({ t, users }));
  };

  return (
    <Card
      title={t('externalCustomerServicesPanelAccountManagementPage:TELEPERFORMANCE_USER_CREATION')}
      extra={(
        <CsvImporter
          onOkayClick={handleBulkImport}
          exampleCsv={getExampleCsv({ externalCS: 'teleperformance' })}
          tableLayout="auto"
        />
      )}
    >
      {isRequested && (
        <BulkResultViewer
          isPending={isPending}
          data={data}
          error={error}
          translations={bulkCreateOrUpdateTranslationKeys}
        />
      )}
    </Card>
  );
};

export default TeleperformanceUserCreation;

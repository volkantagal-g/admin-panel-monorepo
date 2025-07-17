import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CsvImporter from '@shared/components/UI/CsvImporter';

import { Creators } from '../../redux/actions';
import { bulkCreateAssisttUsersSelector } from '../../redux/selectors';
import BulkResultViewer from '../BulkResultViewer';
import { bulkCreateOrUpdateTranslationKeys } from '../BulkResultViewer/constants';
import { getExampleCsv } from '@app/pages/User/ExternalCustomerServicesPanelAccountManagement/utils';

const AssisttUserCreation = () => {
  const { t } = useTranslation(['global', 'externalCustomerServicesPanelAccountManagementPage']);
  const dispatch = useDispatch();

  const data = useSelector(bulkCreateAssisttUsersSelector.getData);
  const isPending = useSelector(bulkCreateAssisttUsersSelector.getIsPending);
  const isRequested = useSelector(bulkCreateAssisttUsersSelector.getIsRequested);
  const error = useSelector(bulkCreateAssisttUsersSelector.getError);

  const handleBulkImport = ({ data: users }) => {
    dispatch(Creators.bulkCreateAssisttUsersRequest({ t, users }));
  };

  return (
    <Card
      title={t('externalCustomerServicesPanelAccountManagementPage:ASSISTT_USER_CREATION')}
      extra={(
        <CsvImporter
          onOkayClick={handleBulkImport}
          exampleCsv={getExampleCsv({ externalCS: 'assistt' })}
          tableLayout="auto"
        />
      )}
    >
      {isRequested && (
        <BulkResultViewer
          isPending={isPending}
          data={data}
          error={error?.message ?? error}
          translations={bulkCreateOrUpdateTranslationKeys}
        />
      )}
    </Card>
  );
};

export default AssisttUserCreation;

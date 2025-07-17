import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CsvImporter from '@shared/components/UI/CsvImporter';

import { Creators } from '../../redux/actions';
import { bulkCreateConcentrixUsersTurkeySelector } from '../../redux/selectors';
import BulkResultViewer from '../BulkResultViewer';
import { bulkCreateOrUpdateTranslationKeys } from '../BulkResultViewer/constants';
import { getExampleCsv } from '@app/pages/User/ExternalCustomerServicesPanelAccountManagement/utils';

const ConcentrixUserCreationTurkey = () => {
  const { t } = useTranslation(['global', 'externalCustomerServicesPanelAccountManagementPage']);
  const dispatch = useDispatch();

  const data = useSelector(bulkCreateConcentrixUsersTurkeySelector.getData);
  const isPending = useSelector(bulkCreateConcentrixUsersTurkeySelector.getIsPending);
  const isRequested = useSelector(bulkCreateConcentrixUsersTurkeySelector.getIsRequested);
  const error = useSelector(bulkCreateConcentrixUsersTurkeySelector.getError);

  const handleBulkImport = ({ data: users }) => {
    dispatch(Creators.bulkCreateConcentrixUsersTurkeyRequest({ t, users }));
  };

  return (
    <Card
      title={t('externalCustomerServicesPanelAccountManagementPage:CONCENTRIX_USER_CREATION_TURKEY')}
      extra={(
        <CsvImporter
          onOkayClick={handleBulkImport}
          exampleCsv={getExampleCsv({
            externalCS: 'concentrix',
            isCountryRequired: false,
            isSaleforceSSORequired: true,
          })}
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

export default ConcentrixUserCreationTurkey;

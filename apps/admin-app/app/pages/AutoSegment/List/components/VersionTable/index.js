import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { tableColumns } from './config';

function VersionTable(props) {
  const { data, activeVersion, handleOnActivateClick } = props;
  const { t } = useTranslation('autoSegmentListPage');

  const columns = tableColumns({ t, activeVersion, handleOnActivateClick });

  return (
    <AntTableV2
      columns={columns}
      data={data}
    />
  );
}

export default VersionTable;

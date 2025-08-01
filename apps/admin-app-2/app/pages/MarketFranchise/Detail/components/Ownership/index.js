import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

function Ownership({ owners }) {
  const { t } = useTranslation('marketFranchisePage');

  const columns = useMemo(() => tableColumns(t), [t]);

  return (
    <Card title={t('OWNERSHIP')}>
      <AntTableV2
        data={owners}
        columns={columns}
        isScrollableToTop={false}
      />
    </Card>
  );
}

Ownership.propTypes = { owners: PropTypes.arrayOf(PropTypes.shape({})) };

Ownership.defaultProps = { owners: [] };

export default Ownership;

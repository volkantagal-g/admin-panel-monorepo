import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';

function Warehouses(props) {
  const { warehouses } = props;
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <AntTable
          title={t('marketFranchisePage:WAREHOUSES')}
          data={warehouses}
          columns={tableColumns}
        />
      </Card>
    </>
  );
}

Warehouses.propTypes = { warehouses: PropTypes.array };

export default Warehouses;

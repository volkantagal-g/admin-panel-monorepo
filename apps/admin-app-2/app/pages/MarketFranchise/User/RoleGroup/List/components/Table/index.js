import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';

const Table = ({ isPending, handlePaginationChange, data, pagination, total }) => {
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');

  return (
    <AntTable
      totalBadge={{ total, label: t('MARKET_FRANCHISE_USER_ROLE_GROUP') }}
      data={data}
      total={total}
      columns={tableColumns(t)}
      loading={isPending}
      pagination={pagination}
      rowKey="_id"
      onPaginationChange={handlePaginationChange}
    />
  );
};

Table.propTypes = {
  isPending: PropTypes.bool,
  handlePaginationChange: PropTypes.func,
  data: PropTypes.shape({}),
  pagination: PropTypes.shape({}),
  total: PropTypes.number,
};
Table.defaultProps = {
  isPending: false,
  handlePaginationChange: () => {},
  data: {},
  pagination: {},
  total: 0,
};

export default Table;

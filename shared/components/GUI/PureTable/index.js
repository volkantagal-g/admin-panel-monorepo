import { Table as TableAntd } from 'antd';
import { memo } from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

export const PureTable = memo(function PureTable({
  columns,
  data,
  ...otherProps
}) {
  const classes = useStyles();

  return (
    <TableAntd
      {...otherProps}
      className={classes.table}
      columns={columns}
      dataSource={data}
      scroll={{ x: 'auto' }}
      pagination={false}
    />
  );
});

PureTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};
PureTable.defaultProps = { data: [] };

import { Pagination, Select, Typography } from 'antd';

import { t } from '@shared/i18n';
import { FIRST_ROW_CLASS_NAME } from '@shared/shared/constants';
import { scrollToTop } from '../../helper';
import useStyles from './styles';

const { Option } = Select;
const { Text } = Typography;
const Footer = ({ total, currentPage, rowsPerPage, pageSizeOptions, onPaginationChange, isScrollableToTop, resetAfterLimitChange, showTotal }) => {
  const classes = useStyles();
  const handleLimitChange = limit => {
    let newCurrentPage = currentPage;
    if (resetAfterLimitChange) {
      newCurrentPage = 1;
    }
    onPaginationChange({ currentPage: newCurrentPage, rowsPerPage: limit });
  };

  return (
    <div className={classes.footer}>
      <div className={classes.pagination}>
        {/*
          showTotal prop for Pagination component is not compatible with simple Pagination component at v4.18.5
          for this reason, showing the total count section has been added manually.
        */}
        {showTotal && <Text className={classes.totalLabel}> {t('TOTAL_N_ITEMS_IN_TABLE', { total })}</Text>}
        <div className={classes.limitContainer}>
          <div className={classes.limitLabel}>{t('LIMIT')}</div>
          <Select
            className={classes.limitSelectBox}
            value={rowsPerPage}
            onChange={handleLimitChange}
            size="small"
            id="antTableV2PaginationLimitInput"
          >
            {pageSizeOptions?.map(value => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </div>
        <Pagination
          simple
          total={total}
          current={currentPage}
          pageSize={rowsPerPage}
          onChange={(page, perPage) => {
            if (isScrollableToTop) {
              scrollToTop(FIRST_ROW_CLASS_NAME);
            }
            onPaginationChange({ currentPage: page, rowsPerPage: perPage });
          }}
        />
      </div>
    </div>
  );
};

export default Footer;

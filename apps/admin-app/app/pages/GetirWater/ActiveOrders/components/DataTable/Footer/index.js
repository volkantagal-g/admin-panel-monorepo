import { Pagination, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { t as translations } from '@shared/i18n';
import { FIRST_ROW_CLASS_NAME } from '@shared/shared/constants';
import { scrollToTop } from './helper';
import useStyles from './styles';

const { Option } = Select;

const Footer = ({ total, currentPage, rowsPerPage, pageSizeOptions, onPaginationChange, isScrollableToTop, resetAfterLimitChange }) => {
  const classes = useStyles();
  const { t } = useTranslation('waterOrderActivePage');

  const handleLimitChange = limit => {
    let newCurrentPage = currentPage;
    if (resetAfterLimitChange) {
      newCurrentPage = 1;
    }
    onPaginationChange({ current: newCurrentPage, pageSize: limit });
  };

  return (
    <div className={classes.footer}>
      <div className={classes.pagination}>
        <div className={classes.limitContainer}>
          <div className={classes.totalLabel}> {t('DATA_TABLE.TOTAL')}: <span className={classes.totalCount}>{total}</span> {t('DATA_TABLE.ORDERS')}</div>
          <span className={classes.seperator}>|</span>
          <div className={classes.limitLabel}>{translations('LIMIT')}</div>
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
            onPaginationChange({ current: page, pageSize: perPage });
          }}
        />
      </div>
    </div>
  );
};

export default Footer;

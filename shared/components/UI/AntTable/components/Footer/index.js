import { useState, useEffect } from 'react';
import { Pagination, Select } from 'antd';

import { t } from '@shared/i18n';
import { FIRST_ROW_CLASS_NAME } from '@shared/shared/constants';
import { scrollToTop } from '../../helper';
import useStyles from './styles';

const { Option } = Select;

const Footer = ({ total, currentPage, rowsPerPage, pageSizeOptions, onPaginationChange, isScrollableToTop }) => {
  const classes = useStyles();
  const [pagination, setPagination] = useState({ currentPage, rowsPerPage });

  const handleLimitChange = limit => {
    if (limit !== pagination.currentPage) {
      setPagination({ currentPage: 1, rowsPerPage: limit });
    }
  };

  useEffect(() => {
    setPagination({ currentPage, rowsPerPage });
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    onPaginationChange({
      currentPage: pagination.currentPage,
      rowsPerPage: pagination.rowsPerPage,
    });
  }, [pagination.currentPage, pagination.rowsPerPage]);

  useEffect(() => {
    if (isScrollableToTop) {
      scrollToTop(FIRST_ROW_CLASS_NAME);
    }
  }, [pagination.currentPage]);

  return (
    <div className={classes.footer}>
      <div className={classes.pagination}>
        <div className={classes.limitContainer}>
          <div className={classes.limitLabel}>{t('LIMIT')}</div>
          <Select className={classes.limitSelectBox} value={pagination.rowsPerPage} onChange={handleLimitChange} size="small">
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
          current={pagination.currentPage}
          pageSize={pagination.rowsPerPage}
          onChange={page => {
            return setPagination({ ...pagination, currentPage: page });
          }}
        />
      </div>
    </div>
  );
};

export default Footer;

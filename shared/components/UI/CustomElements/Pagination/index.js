import { Pagination as AntdPagination, Row, Col } from 'antd';

import PropTypes from 'prop-types';

import { useSearchParams } from 'react-router-dom';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';

import useStyles from './styles';
import { t } from '@shared/i18n';

import TooltipUI from '@shared/components/UI/CustomElements/Tooltip';

function PaginationUI({
  currentPage,
  currentPageSize,
  enableQueryPagination,
  onChange,
  onShowSizeChange,
  pageSizeOptions,
  showQuickJumper,
  showSizeChanger,
  total,
  ...otherProps
}) {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = enableQueryPagination && Number(searchParams.get('page'));
  const queryLimit = enableQueryPagination && Number(searchParams.get('limit'));

  const isShowExtraOptions = showQuickJumper || showSizeChanger;
  const [isExtraOptionsVisible, setIsExtraOptionsVisible] = useState(false);

  const handleQueryParams = (page, pageSize) => {
    searchParams.set('page', page);
    searchParams.set('limit', pageSize);
    setSearchParams(searchParams);
  };

  const handleExtraOptions = () => {
    setIsExtraOptionsVisible(!isExtraOptionsVisible);
  };

  useEffect(() => {
    if (
      !enableQueryPagination &&
      (
        searchParams.has('page') ||
        searchParams.has('limit')
      )
    ) {
      searchParams.delete('page');
      searchParams.delete('limit');

      setSearchParams(searchParams);
    }
  }, [enableQueryPagination, searchParams, setSearchParams]);

  return (
    <Row justify="space-between">
      {isShowExtraOptions && (
        <Col flex="auto" className={classes.extraOption}>
          {isExtraOptionsVisible ? (
            <TooltipUI title={t('CUSTOM_ELEMENTS.PAGINATION.HIDE_EXTRA')}>
              <EyeInvisibleOutlined onClick={handleExtraOptions} />
            </TooltipUI>
          )
            : (
              <TooltipUI title={t('CUSTOM_ELEMENTS.PAGINATION.SHOW_EXTRA')}>
                <EyeOutlined onClick={handleExtraOptions} />
              </TooltipUI>
            )}
        </Col>
      )}
      <Col flex="auto">
        <Row justify="end">
          <AntdPagination
            {...otherProps}
            className={classes.customPaginationWrapper}
            current={currentPage}
            pageSize={currentPageSize}
            defaultCurrent={queryPage || 1}
            defaultPageSize={queryLimit || 10}
            pageSizeOptions={pageSizeOptions}
            showQuickJumper={isExtraOptionsVisible && showQuickJumper}
            showSizeChanger={isExtraOptionsVisible && showSizeChanger}
            total={total}
            onChange={(page, pageSize) => {
              onChange(page, pageSize);
              if (enableQueryPagination) {
                handleQueryParams(page, pageSize);
              }
            }}
            onShowSizeChange={onShowSizeChange}
          />
        </Row>
      </Col>
    </Row>
  );
}

PaginationUI.propTypes = {
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  disabled: PropTypes.bool,
  enableQueryPagination: PropTypes.bool,
  hideOnSinglePage: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  showTitle: PropTypes.bool,
  simple: PropTypes.bool,
  total: PropTypes.number,
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
};

PaginationUI.defaultProps = {
  currentPage: 1,
  currentPageSize: 10,
  disabled: false,
  enableQueryPagination: false,
  hideOnSinglePage: false,
  onChange: () => {},
  onShowSizeChange: () => {},
  pageSizeOptions: [10, 50, 100],
  showQuickJumper: true,
  showSizeChanger: true,
  showTitle: true,
  simple: false,
  total: 0,
};

export default PaginationUI;

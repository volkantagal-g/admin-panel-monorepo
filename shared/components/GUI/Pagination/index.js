import { Pagination as AntdPagination, Row, Col } from 'antd';

import PropTypes from 'prop-types';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { memo, useState } from 'react';

import useStyles from './styles';
import { t } from '@shared/i18n';

import TooltipUI from '@shared/components/UI/CustomElements/Tooltip';

const Pagination = memo(function Pagination({
  currentPage,
  currentPageSize,
  onChange,
  onShowSizeChange,
  pageSizeOptions,
  showQuickJumper,
  showSizeChanger,
  total,
  ...otherProps
}) {
  const classes = useStyles();

  const isShowExtraOptions = showQuickJumper || showSizeChanger;
  const [isExtraOptionsVisible, setIsExtraOptionsVisible] = useState(false);

  const handleExtraOptions = () => {
    setIsExtraOptionsVisible(!isExtraOptionsVisible);
  };

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
            defaultCurrent={1}
            defaultPageSize={10}
            pageSizeOptions={pageSizeOptions}
            showQuickJumper={isExtraOptionsVisible && showQuickJumper}
            showSizeChanger={isExtraOptionsVisible && showSizeChanger}
            total={total}
            onChange={(page, pageSize) => {
              onChange(page, pageSize);
            }}
            onShowSizeChange={onShowSizeChange}
          />
        </Row>
      </Col>
    </Row>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  disabled: PropTypes.bool,
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

Pagination.defaultProps = {
  currentPage: 1,
  currentPageSize: 10,
  disabled: false,
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

export default Pagination;

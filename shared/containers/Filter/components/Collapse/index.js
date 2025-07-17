import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { Collapse, Space } from 'antd';

import ErrorFallback from '@shared/components/UI/ErrorFallback';
import useWindowSize from '@shared/shared/hooks/useWindowSize';

import { FILTER_CONSTANTS } from '@shared/containers/Filter/constants';
import useStyles from '@shared/containers/Filter/styles';

const { Panel } = Collapse;

const FilterCollapse = ({ collapseTitle, containerClassName, isCollapsedByDefault, extra, children }) => {
  const { t } = useTranslation('filterComponent');
  const classes = useStyles();
  const { width } = useWindowSize();

  const filterCollapseKey = isCollapsedByDefault ? null : FILTER_CONSTANTS.PANEL_KEY;
  const defaultCollapseTitle = t(FILTER_CONSTANTS.COLLAPSE_TITLE);

  return (
    <Collapse defaultActiveKey={filterCollapseKey} className={containerClassName ?? classes.filterContainer}>
      <Panel key={FILTER_CONSTANTS.PANEL_KEY} header={collapseTitle ?? defaultCollapseTitle} extra={extra}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Space direction={width < 1200 ? 'vertical' : 'horizontal'}>{children}</Space>
        </ErrorBoundary>
      </Panel>
    </Collapse>
  );
};

FilterCollapse.defaultProps = {
  collapseTitle: null,
  containerClassName: null,
  isCollapsedByDefault: false,
  extra: null,
};

FilterCollapse.propTypes = {
  collapseTitle: PropTypes.string,
  containerClassName: PropTypes.string,
  isCollapsedByDefault: PropTypes.bool,
  extra: PropTypes.node,
  children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.node), PropTypes.string]).isRequired,
};

export default FilterCollapse;

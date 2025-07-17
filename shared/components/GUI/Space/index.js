import { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import useStyles from './styles';
import { ErrorBadge } from '@shared/components/GUI/ErrorBadge';

export const Space = memo(function Space({ title, className, errorBadgeProps = {}, extra, children, dataTestId }) {
  const classes = useStyles({ hasDangerBorder: errorBadgeProps.errors?.length });
  return (
    <div className={classNames(classes.space, className)} data-testid={dataTestId}>
      <ErrorBadge
        title={errorBadgeProps.title}
        errors={errorBadgeProps.errors}
      />
      {title && (
      <Row align="middle" justify="space-between">
        <Col>
          {title && <p className={classes.title}>{title}</p>}
        </Col>
        <Col>
          {extra && extra}
        </Col>
      </Row>
      )}
      {children}
    </div>
  );
});

Space.propTypes = {
  title: PropTypes.string,
  errorBadgeProps: PropTypes.shape({}),
  children: PropTypes.element.isRequired,
};

Space.defaultProps = {
  title: '',
  errorBadgeProps: {},
};

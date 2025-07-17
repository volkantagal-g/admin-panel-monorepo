import { Component } from 'react';
import PropTypes from 'prop-types';

/*
  Error boundaries do not yet have hooks equivalent
  But are still absolutely important in making sure
  library errors (like from maps) aren't crashing
  entire pages
*/
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { error: '', errorInfo: '', hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    // eslint-disable-next-line react/no-unused-state
    this.setState({ errorInfo });
  }

  render() {
    return this.props.children;
  }
}
ErrorBoundary.propTypes = { children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired };

export default ErrorBoundary;

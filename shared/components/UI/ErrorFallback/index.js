import { Alert } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ErrorFallback = ({ title, error }) => {
  const { t } = useTranslation('global');

  const messageTitle = title || t('ERROR_TITLE');

  return (
    <Alert
      role="alert"
      type="error"
      message={messageTitle}
      description={error.message}
      showIcon
    />
  );
};

ErrorFallback.defaultProps = { title: '' };

ErrorFallback.propTypes = {
  title: PropTypes.string,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }).isRequired,
};

export default ErrorFallback;

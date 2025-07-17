import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import InAppRedirectionSelect from '@shared/containers/Marketing/Select/InAppRedirectionSelect';

export const InAppRedirectAction = ({ fieldName, disabled }) => {
  return (
    <InAppRedirectionSelect fieldName={fieldName} rules={rules.inAppPages} disabled={disabled} />
  );
};

export default InAppRedirectAction;

import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

import LocalsChainSelect from '@shared/containers/Marketing/Select/LocalsChainSelect';

const ChainShopAction = ({ fieldName, disabled }) => {
  return (
    <LocalsChainSelect rules={rules.chains} fieldName={fieldName} disabled={disabled} />
  );
};

export default ChainShopAction;

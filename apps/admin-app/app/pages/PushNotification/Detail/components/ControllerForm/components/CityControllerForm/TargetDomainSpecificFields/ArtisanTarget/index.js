import { memo } from 'react';

import ArtisanStoreControl from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl';

const ArtisanTarget = ({ form, artisansFormName, isFormEditable }) => {
  return (
    <ArtisanStoreControl
      form={form}
      parentFieldName={artisansFormName}
      disabled={!isFormEditable}
      mode="single"
      chainSelection
      storeFieldName="targetMerchants"
    />
  );
};

export default memo(ArtisanTarget);

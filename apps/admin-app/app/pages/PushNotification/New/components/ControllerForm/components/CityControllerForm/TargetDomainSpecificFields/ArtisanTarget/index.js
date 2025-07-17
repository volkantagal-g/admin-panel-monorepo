import { memo } from 'react';

import ArtisanStoreControl from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl';

const ArtisanTarget = ({ form, artisansFormName }) => {
  return (
    <ArtisanStoreControl form={form} parentFieldName={artisansFormName} mode="single" chainSelection storeFieldName="targetMerchants" />
  );
};

export default memo(ArtisanTarget);

import { memo } from 'react';
import { Select, Spin } from 'antd';

import { getShopsByName } from '@shared/api/shop';
import useDebounceFetcher from '@shared/shared/hooks/useDebounceFetcher';

const SelectArtisans = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const {
    fetching,
    options,
    debounceFetcher,
  } = useDebounceFetcher({ fetchOptions, debounceTimeout });

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

export async function fetchShopsList(name) {
  return getShopsByName({ name })
    .then(shops =>
      shops.map(shop => ({
        label: shop.name,
        value: shop.id,
      })),
    );
}

export default memo(SelectArtisans);
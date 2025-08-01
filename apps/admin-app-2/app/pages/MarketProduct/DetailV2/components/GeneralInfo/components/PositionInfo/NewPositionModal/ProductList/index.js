import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Table } from '@shared/components/GUI';
import { getProductsOfSubCategorySelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getProductTableColumns } from './config';
import { getLangKey } from '@shared/i18n';

export const ProductList = memo(function ProductList({ searchedText }) {
  const subCategoryProductPositions = useSelector(getProductsOfSubCategorySelector.getSubCategoryProductPositions);
  const isPending = useSelector(getProductsOfSubCategorySelector.getIsPending);
  const langKey = getLangKey();

  const data = useMemo(
    () => (subCategoryProductPositions ?? [])
      .sort((a, b) => a?.position > b?.position)
      .map((productPosition, index) => ({
        ...productPosition,
        position: index + 1,
      }))
      .filter(productPosition => {
        if (!searchedText) {
          return true;
        }

        const fullName = productPosition.item?.fullName?.[langKey]?.toLocaleLowerCase?.(langKey);
        return fullName?.includes(searchedText.toLocaleLowerCase?.(langKey));
      }),
    [searchedText, langKey, subCategoryProductPositions],
  );

  return (
    <Table
      data={data}
      columns={getProductTableColumns()}
      loading={isPending}
      scroll={{ y: 240 }}
    />
  );
});

ProductList.propTypes = { searchedText: PropTypes.string };
ProductList.defaultProps = { searchedText: undefined };

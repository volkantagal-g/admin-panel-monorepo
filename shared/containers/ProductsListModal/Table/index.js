import { useTranslation } from 'react-i18next';

import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const ProductsListTable = ({ products, isMobile }) => {
  const { t } = useTranslation(['global', 'activeOrdersForExecutiveDashboardPage']);
  const { canAccess } = usePermission();
  const hasPermissionToProductDetail = canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL);
  const columns = tableColumns(hasPermissionToProductDetail, isMobile, t);

  return <AntTableV2 columns={columns} data={products} scroll={{ y: isMobile ? 360 : 400 }} />;
};

export default ProductsListTable;

import { useSelector } from 'react-redux';

import { brandsSelector, citiesSelector, firmsSelector, statusesSelector, filtersSelector } from '@app/pages/GetirWater/VendorFilter/redux/selectors';

export default function useFilterStoreState() {
  const brands = useSelector(brandsSelector);
  const cities = useSelector(citiesSelector);
  const firms = useSelector(firmsSelector);
  const statuses = useSelector(statusesSelector);
  const filters = useSelector(filtersSelector);

  return { brands, cities, firms, statuses, filters };
}

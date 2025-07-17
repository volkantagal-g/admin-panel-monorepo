import { Form } from 'antd';
import { useEffect, useRef } from 'react';

import { FilterFormState } from '@app/pages/GetirWater/VendorFilter/components/Filter/constants';
import { Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';

export default function useFilterForm(dispatch, filterStoreState, isOpenList) {
  const [filterForm] = Form.useForm();
  const filterFormStateRef = useRef(FilterFormState.FORM_VALUES_NOT_READY);
  const { brands, cities, firms, statuses } = filterStoreState;

  useEffect(() => {
    if (filterFormStateRef.current !== FilterFormState.FORM_VALUES_INITIALIZED) {
      const isAllValuesFetched = brands.length && cities.length && firms.length && statuses.length;
      if (isAllValuesFetched) {
        filterFormStateRef.current = FilterFormState.FORM_VALUES_READY;
      }
      if (filterFormStateRef.current === FilterFormState.FORM_VALUES_READY) {
        const initialFormFilterValues = {
          statusIds: statuses.map(status => String(status.id)),
          isOpen: isOpenList.map(isOpen => isOpen.value),
          brandIds: brands.map(brand => brand.id),
          firmIds: firms.map(firm => firm.id),
          cityIds: cities.map(city => city._id),
        };
        filterForm.setFieldsValue(initialFormFilterValues);
        dispatch(Creators.setFilters({ filters: initialFormFilterValues }));
        filterFormStateRef.current = FilterFormState.FORM_VALUES_INITIALIZED;
      }
    }
  }, [brands, cities, dispatch, filterForm, firms, isOpenList, statuses]);

  const findIfFormItemIsDisabled = () => filterFormStateRef.current !== FilterFormState.FORM_VALUES_INITIALIZED;

  return { filterForm, filterFormStateRef, findIfFormItemIsDisabled };
}

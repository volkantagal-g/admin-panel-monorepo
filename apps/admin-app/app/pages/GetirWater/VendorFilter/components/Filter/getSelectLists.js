import { createSelectOption } from '@app/pages/GetirWater/utils';
import { getIsOpenSelectList } from './constants';

export default function getSelectLists(filterStoreState, t) {
  const { brands, cities, firms, statuses } = filterStoreState;
  const brandSelectList = createSelectOption(brands, 'id', 'brandName');
  const citySelectList = createSelectOption(cities, '_id', 'name');
  const firmSelectList = createSelectOption(firms, 'id', 'firmName');
  const statusSelectList = createSelectOption(statuses, 'id', 'status');
  const isOpenSelectList = getIsOpenSelectList(t);

  return {
    brandSelectList,
    citySelectList,
    firmSelectList,
    statusSelectList,
    isOpenSelectList,
  };
}

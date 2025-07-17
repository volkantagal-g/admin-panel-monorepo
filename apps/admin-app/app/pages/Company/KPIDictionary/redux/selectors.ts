import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.COMPANY.KPI_DICTIONARY;

export const filterOptionsSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].filterOptions?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].filterOptions?.data,
  getFormattedSelectOptionsData: (state: {[reduxKey: string]: State}) => {
    const data = state[reduxKey].filterOptions?.data;
    const result = {
      categories: [] as { label: string; value: string }[],
      acronyms: [] as { label: string; value: string }[],
      domains: [] as { label: string; value: string }[],
    };
    if (!data) return result;
    if (data.categories && data.categories.length > 0) {
      result.categories = data.categories.map((category: string) => ({
        label: category,
        value: category,
      }));
    }
    if (data.acronyms && data.acronyms.length > 0) {
      result.acronyms = data.acronyms.map((acronym: string) => ({
        label: acronym,
        value: acronym,
      }));
    }
    if (data.domains && data.domains.length > 0) {
      result.domains = data.domains.map((domain: string) => ({
        label: domain,
        value: domain,
      }));
    }

    return result;
  },
};

export const kpiDictionarySelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].kpiDictionary?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].kpiDictionary?.data,
  getTotalCount: (state: {[reduxKey: string]: State}) => state[reduxKey].kpiDictionary?.totalCount,
};

export const kpiAcronymDictionarySelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey].kpiAcronymDictionary?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey].kpiAcronymDictionary?.data,
};

export const filterSelector = {
  getFilters: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filters,
  getPagination: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filters.pagination,
};

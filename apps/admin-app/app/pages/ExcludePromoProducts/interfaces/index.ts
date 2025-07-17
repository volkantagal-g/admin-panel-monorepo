export interface IFilters {
  domainTypes: null | number[];
  status: null | number;
  isFreeProduct: boolean;
  responsibleDepartment: null | string;
  promoMechanic: null | number;
  promoUsageType: number;
}
export interface IFiltersWithPagination extends IFilters{
  limit: number,
  page: number
}

type Languages = {
  tr: string;
  en: string;
  'en-US': string;
  fr: string;
  de: string;
  it: string;
};

export type ResponsibleDepartment = {
  id: string;
  name: Languages | Partial<Languages>;
};
export interface ProductItem {
  item: string;
}

interface Promo {
  _id: string;
  promoCode: string;
  status: number;
  bgColor: null | string;
  textColor: null | string;
  promoTarget: number;
  validFrom: string;
  validUntil: string;
  priority: number;
  isAggressionStateNonAffected: boolean;
  title: null | string;
  flowType: number;
  flow: {
    gainedOrderCount: number;
  };
  usedOrderCount: number;
  orderLimitCount: number;
}

export type PromoList = Partial<Promo>[];

export type PaginationType = {
  currentPage: number,
  rowsPerPage: number,
}

export type OptionType = {
  label: string,
  value: number,
};

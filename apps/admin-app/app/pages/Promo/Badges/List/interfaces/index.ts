export interface IFilters {
  name: string | null;
  promoMechanic: string | null;
}
export interface IFiltersWithPagination extends IFilters{
  limit: number,
  page: number
}

export type Languages = {
  tr: string;
  en: string;
  'en-US': string;
  fr: string;
  de: string;
  it: string;
  nl: string;
  es: string;
  pt: string;
};

export interface PromoBadge {
  _id?: string;
  name: string;
  promoMechanic: number;
  productListingPage: Record<string, string>;
  productDetailPage: Record<string, string>;
  basketApplied: Record<string, string>;
  basketNotApplied: Record<string, string>;
  status?: number;
}

export type PromoBadgeList = Partial<PromoBadge>[];

export type PaginationType = {
  currentPage: number,
  rowsPerPage: number,
}

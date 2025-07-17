import axios from '@shared/axios/common';
import {
  GetDiscountCodesActionTypesResponse,
  UpdateDiscountCodesRequestPayload,
} from '@app/pages/DiscountCode/BulkEdit/types';
import {
  ChildrenBenefitProduct,
  GetChildrenProductsResponse,
} from '@app/pages/Promo/Detail/components/ParentBenefitType/types';

export type MessageResponse = {
  message: string;
}
export async function getDiscountCodesActionTypes(codes: string[]): Promise<GetDiscountCodesActionTypesResponse[]> {
  const response = await axios.post<GetDiscountCodesActionTypesResponse[]>('/discountCode/action-types', { discountCodes: codes });
  return response.data;
}

export async function updateDiscountCodes(payload: UpdateDiscountCodesRequestPayload) {
  const response = await axios.patch<MessageResponse>('/discountCode', payload);
  return response.data;
}

export async function getParentPromoProducts(promoId: MongoIDType) {
  const response = await axios.get<GetChildrenProductsResponse[]>(`/promo/${promoId}/children-products`);
  return response.data;
}

export async function upsertChildrenProducts(promoId: MongoIDType, products: ChildrenBenefitProduct[]) {
  const response = await axios.post<MessageResponse>(`/promo/${promoId}/children-products`, { products });
  return response.data;
}

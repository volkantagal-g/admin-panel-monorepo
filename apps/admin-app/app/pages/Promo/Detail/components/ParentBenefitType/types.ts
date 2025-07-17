export interface GetChildrenProductsResponse {
  childId: MongoIDType
  products: BenefitProduct[]
}

export interface BenefitProduct {
  id: MongoIDType
  alreadySold: number
  discountedPrice?: number
  isSold: boolean
  saleLimit: number
  supplierSupport?: number
  supplierSupportReferenceId?: string
  thirdPartyReferenceId?: string
  thirdPartySupport?: number
  type?: number
}

export interface ChildrenBenefitProduct {
  id: MongoIDType
  promoId: MongoIDType
  saleLimit: number
  supplierSupport: number
  supplierSupportReferenceId: string
  thirdPartyReferenceId: string
  thirdPartySupport: number
}

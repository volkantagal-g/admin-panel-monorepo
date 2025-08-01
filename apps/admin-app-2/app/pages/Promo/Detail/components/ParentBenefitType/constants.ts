import * as Yup from 'yup';

import { GetChildrenProductsResponse } from '@app/pages/Promo/Detail/components/ParentBenefitType/types';
import { downloadDataAsCSV } from '@shared/utils/common';
import { t } from '@shared/i18n';

type RowType = {
  id: string,
  promoId: string;
  alreadySold: string;
  discountedPrice: string;
  isSold: string;
  saleLimit: string;
  supplierSupport: string;
  supplierSupportReferenceId: string;
  thirdPartySupport: string;
  thirdPartyReferenceId: string;
  type: string;
}

const columns: [RowType] = [
  {
    id: 'id',
    promoId: 'promoId',
    alreadySold: 'alreadySold',
    discountedPrice: 'discountedPrice',
    isSold: 'isSold',
    saleLimit: 'saleLimit',
    supplierSupport: 'supplierSupport',
    supplierSupportReferenceId: 'supplierSupportReferenceId',
    thirdPartySupport: 'thirdPartySupport',
    thirdPartyReferenceId: 'thirdPartyReferenceId',
    type: 'type',
  },
];

function getCsvData(children: GetChildrenProductsResponse[]): RowType[] {
  const data: RowType[] = [];
  children.forEach(child => {
    child.products.forEach(product => {
      data.push({
        id: product.id,
        promoId: child.childId,
        alreadySold: product.alreadySold?.toString() || '0',
        discountedPrice: product.discountedPrice?.toString() || '0',
        isSold: product.isSold ? t('global:YES') : t('global:NO'),
        saleLimit: product.saleLimit?.toString() || '0',
        supplierSupport: product.supplierSupport?.toString() || '0',
        supplierSupportReferenceId: product.supplierSupportReferenceId || '',
        thirdPartySupport: product.thirdPartySupport?.toString() || '0',
        thirdPartyReferenceId: product.thirdPartyReferenceId || '',
        type: product.type?.toString() || '?',
      });
    });
  });
  return data;
}

function getFileName(promoId: MongoIDType): string {
  return `parent_promo_products_${promoId}.csv`;
}

export function downloadParentPromoProducts(products: GetChildrenProductsResponse[], promoId: MongoIDType) {
  const data = getCsvData(products);
  const fileName = getFileName(promoId);

  downloadDataAsCSV({ data, columns, fileName });
}

export const CSV_VALIDATION_SCHEMA = Yup.object().shape({
  id: Yup.string().required(),
  promoId: Yup.string().required(),
  saleLimit: Yup.number().required(),
  supplierSupport: Yup.number().min(0).max(1).nullable(),
  supplierSupportReferenceId: Yup.string().nullable(),
  thirdPartySupport: Yup.number().min(0).max(1).nullable(),
  thirdPartyReferenceId: Yup.string().nullable(),
});

export const EXAMPLE_CSV = [
  {
    id: '679378e665265831149a2093',
    promoId: '679378e665265831149a2093',
    saleLimit: 10,
    supplierSupport: 0.1,
    supplierSupportReferenceId: 'SUP123',
    thirdPartySupport: 0.2,
    thirdPartyReferenceId: 'TP123',
  },
  {
    id: '679378fc06efb4f780bc43b2',
    promoId: '679378fc06efb4f780bc43b2',
    saleLimit: 20,
    supplierSupport: 0.15,
    supplierSupportReferenceId: 'SUP456',
    thirdPartySupport: 0.25,
    thirdPartyReferenceId: 'TP456',
  },
  {
    id: '67937901dde542b6b858f5e0',
    promoId: '67937901dde542b6b858f5e0',
    saleLimit: 30,
    supplierSupport: 0.2,
    supplierSupportReferenceId: 'SUP789',
    thirdPartySupport: 0.3,
    thirdPartyReferenceId: 'TP789',
  },
];

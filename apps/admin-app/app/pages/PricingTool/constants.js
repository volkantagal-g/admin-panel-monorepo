import category from './assets/img/category.png';
import products from './assets/img/products.png';
import subcategory from './assets/img/subcategory.png';
import discounted from './assets/img/discounted.png';
import scratch from './assets/img/scratch.png';
import brand from './assets/img/brand.png';
import supplier from './assets/img/supplier.png';
import index from './assets/img/index.png';
import manufacturer from './assets/img/manufacturer.png';

export const countryList = {
  XI: 'ILLINOIS',
  XM: 'MASSACHUSETTS',
  XN: 'NEW YORK',
  GB: 'UNITED KINGDOM',
  NL: 'NETHERLANDS',
  FR: 'FRANCE',
  DE: 'GERMANY',
  ES: 'SPAIN',
  TR: 'TURKEY',
  IT: 'ITALY',
  PT: 'PORTUGAL',

};

export const SELECT_TITLE_ICONS = {
  category,
  subcategory,
  product: products,
  discounted,
  scratch,
  brand,
  manufacturer,
  supplier,
  index,
};

export const PRICE_TYPE = 'price';

export const FILTER_KEY = {
  category: 'category',
  subcategory: 'subcategory',
  brand: 'brand_name',
  supplier: 'supplier_name',
  manufacturer: 'manufacturer_name',
  product: 'product_id',
};

declare module 'user_app/UserApp';
declare module 'product_app/ProductApp';
declare module 'order_app/OrderApp';

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
} 
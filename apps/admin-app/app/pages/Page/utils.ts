import { ROUTE_MAP } from '@app/routes.ts';

export const getRouteConfigByPermKey = ({ permKey }: {permKey: string}) => {
  const pageKey = permKey?.split('PAGE_')[1];

  return ROUTE_MAP[pageKey as keyof typeof ROUTE_MAP];
};

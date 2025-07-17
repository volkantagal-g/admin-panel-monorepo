import Loadable from '@shared/utils/loadable';

export const Header = Loadable(() => import('@app/pages/CommunicationServiceCredentials/List/components/Header'));
export const CommunicationServiceCredentialsFilter = Loadable(() => import('@app/pages/CommunicationServiceCredentials/List/components/Filter'));
export const CommunicationServiceCredentialsListTable = Loadable(() => import('@app/pages/CommunicationServiceCredentials/List/components/Table'));

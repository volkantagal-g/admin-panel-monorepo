import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import CollapsePanel from '../common/CollapsePanel';
import VisitorDetail from './VisitorDetail';
import LastLocation from './LastLocation';
import GetirMarketLastOrderDetail from './LastOrderDetail';
import AllDomainsLastOrderDetail from './AllDomainsLastOrderDetail';
import FirstOrderDetail from './FirstOrderDetail';
import MaxOrderDetail from './MaxOrderDetail';
import GetirTotalOrderDetail from './GetirTotalOrderDetail';
import BoughtProductFilter from './BoughtProductFilter';
import NonBoughtProductFilter from './NonBoughtProductFilter';
import OrderProductDetail from './OrderProductDetail';
// eslint-disable-next-line import/no-cycle
import NotifDetailNew from './NotifDetailNew';
import PromoDetail from './PromoDetail';
import IncludedSegments from './IncludedSegments';
import ExcludedSegments from './ExcludedSegments';
import BuildNumberDetail from './BuildNumberDetail';
import BaseUserScore from './BaseUserScore';
import EarlyChurn from './EarlyChurn';
import ProductPriceDetails from './ProductPriceDetails';
import OrderPriceDetail from './OrderPriceDetail';
import DayDifferenceBetweenOrders from './DayDifferenceBetweenOrders';
import PaymentMethods from './PaymentMethods';
import PurchaseFrequencyDetail from './PurchaseFrequencyDetail';
import NotOrderedDetail from './NotOrderedDetail';
import ClientDownloadDate from './ClientDownloadDate';
import OrderRatingDetail from './OrderRatingDetail';
import DeviceSpesification from './DeviceSpesification';
import ABTestDetail from './ABTestDetail';
import { getCollapseTriggeredKey } from '../../redux/selectors';
import DataScienceSection from '../common/DataScienceSection';
import { clientListSections } from '../../constants';
import SignedUpDetail from './SignedUpDetail';
import GSMCountryCodeDetail from './GSMCountryCodeDetail';
import CommunicationPreferencesDetail from './CommunicationPreferencesDetail';
import DeliveryDurationCETADetail from './DeliveryDurationCETADetail';
import OrderFeedbackDetail from './OrderFeedbackDetail';

const activeKey = 'getir';

const GetirGeneralDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const collapseTriggered = useSelector(getCollapseTriggeredKey(activeKey));

  return (
    <CollapsePanel isParent header={t('GETIR_GENERAL_DETAIL')} activeKey={activeKey} triggerCollapseAction={collapseTriggered}>
      <VisitorDetail />
      <LastLocation />
      <GetirMarketLastOrderDetail />
      <AllDomainsLastOrderDetail />
      <FirstOrderDetail />
      <MaxOrderDetail />
      <GetirTotalOrderDetail />
      <BoughtProductFilter />
      <NonBoughtProductFilter />
      <OrderProductDetail />
      <NotifDetailNew />
      <PromoDetail />
      <IncludedSegments />
      <ExcludedSegments />
      <BuildNumberDetail />
      <BaseUserScore />
      <EarlyChurn />
      <ProductPriceDetails />
      <OrderPriceDetail />
      <DayDifferenceBetweenOrders />
      <PaymentMethods />
      <PurchaseFrequencyDetail />
      <NotOrderedDetail />
      <OrderRatingDetail />
      <ClientDownloadDate />
      <SignedUpDetail />
      <GSMCountryCodeDetail />
      <DeviceSpesification />
      <DataScienceSection section={clientListSections.getirGeneralDetail} />
      <ABTestDetail />
      <CommunicationPreferencesDetail />
      <DeliveryDurationCETADetail />
      <OrderFeedbackDetail />
    </CollapsePanel>
  );
};

export default GetirGeneralDetail;

export const sectionName = 'getir';

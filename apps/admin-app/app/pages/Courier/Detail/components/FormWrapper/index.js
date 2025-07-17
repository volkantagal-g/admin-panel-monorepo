import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import permKey from '@shared/shared/permKey.json';
import Loadable from '@shared/utils/loadable';
import { usePermission } from '@shared/hooks';
import { courierSelector } from '../../redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import GeneralInfo from '../GeneralInfo';
import PersonalInfo from '../PersonalInfo';
import RelativeInfo from '../RelativeInfo';
import Operations from '../Operations';
import StoreInformation from '../StoreInformation';
import Map from '../Map';
import HomeAddress from '../HomeAddress';
import Domain from '../Domain';
import AvailableVehicles from '../AvailableVehicles';
import EmploymentType from '../EmploymentType';
import EmployersInfo from '../EmployersInfo';
import Login from '../Login';
import ActiveOrders from '../ActiveOrders';
import ActiveReturns from '../ActiveReturns';
import Orders from '../Orders';
import CurrentVehicle from '../CurrentVehicle';
import StatusLogs from '../StatusLogs';
import CourierGeoFenceLog from '../GeoFenceStatus';

export const CrisisManagement = Loadable(() => import('@app/pages/Courier/CrisisManagement'));

function FormWrapper() {
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();

  const courierDetail = useSelector(courierSelector.getData);
  const isPendingGetCourierDetail = useSelector(courierSelector.getIsPending);

  const handleErrorNotifications = errorObject => {
    dispatch(ToastCreators.error(errorObject));
  };

  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  return (
    <Row gutter={8}>
      <Col md={10} sm={8} xs={8}>
        <Map
          data={courierDetail.location}
          isPending={isPendingGetCourierDetail}
        />
        <GeneralInfo
          errorNotification={handleErrorNotifications}
          data={courierDetail}
        />
        {
          !hasFinanceEmployeeRole && (
          <EmploymentType
            permKey={permKey.PAGE_COURIER_DETAIL_EMPLOYMENT}
            data={courierDetail}
            isPending={isPendingGetCourierDetail}
          />
          )
        }
        <Domain
          data={courierDetail}
          isPending={isPendingGetCourierDetail}
        />
        {
          !hasFinanceEmployeeRole && (
            <>
              <AvailableVehicles
                permKey={permKey.PAGE_COURIER_DETAIL_VEHICLE}
                data={courierDetail}
                isPending={isPendingGetCourierDetail}
              />
              <Login
                permKey={permKey.PAGE_COURIER_DETAIL_LOGIN}
                data={courierDetail}
                isPending={isPendingGetCourierDetail}
              />
              <HomeAddress data={courierDetail.homeAddress} />
            </>
          )
        }
        <PersonalInfo data={courierDetail} />
        {!hasFinanceEmployeeRole && <RelativeInfo data={courierDetail} /> }
      </Col>

      <Col md={10} sm={8} xs={8}>
        <StoreInformation
          data={courierDetail}
          permKey={permKey.PAGE_COURIER_DETAIL_STORE_INFORMATION}
        />
        <Can permKey={permKey.PAGE_COURIER_DETAIL_ACTIVE_ORDERS}>
          <ActiveOrders data={courierDetail} />
        </Can>
        {
          (courierDetail?.returnOrder && !hasFinanceEmployeeRole) && (
            <Can permKey={permKey.PAGE_COURIER_DETAIL_ACTIVE_ORDERS}>
              <ActiveReturns data={courierDetail} />
            </Can>
          )
        }
        <CurrentVehicle data={courierDetail} />
        <EmployersInfo data={courierDetail} />
      </Col>

      <Col md={4} sm={8} xs={8}>
        <Operations data={courierDetail} />
      </Col>

      <Can permKey={permKey.PAGE_COURIER_DETAIL_ORDER}>
        <Col span={24}>
          <Orders courierId={courierDetail?._id} />
        </Col>
      </Can>

      { !hasFinanceEmployeeRole && <CrisisManagement courierId={courierDetail?._id} />}

      <Can permKey={permKey.PAGE_COURIER_DETAIL_STATUS_LOGS}>
        <Col span={24} className="mt-1">
          <StatusLogs courierId={courierDetail?._id} />
        </Col>
        <Col span={24} className="mt-1">
          <CourierGeoFenceLog courierId={courierDetail?._id} />
        </Col>
      </Can>
    </Row>
  );
}

export default FormWrapper;

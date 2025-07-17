import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Content } from '@shared/components/GUI';
import GeneralInfoForm from '@app/pages/Planogram/Warehouses/Detail/components/GeneralInfoForm';
import PlanogramsTable from '@app/pages/Planogram/Warehouses/Detail/components/PlanogramsTable';
import Header from '@app/pages/Planogram/Warehouses/Detail/components/Header';

import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Planogram/Warehouses/redux/saga';
import reducer from '@app/pages/Planogram/Warehouses/redux/reducer';

const PlanogramWarehousesDetailPage = () => {
  const dispatch = useDispatch();

  const initialPagination = useMemo(() => ({ page: 1, pageSize: 10 }), []);

  const { id } = useParams();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [currentPagination, setCurrentPagination] = useState(initialPagination);

  const reduxKey = REDUX_KEY.PLANOGRAM.WAREHOUSES;
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const initializePage = useCallback(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPlanogramWarehouseDetailsRequest({ body: { warehouseId: id, pagination: { page: 1, pageSize: 10 } } }));
    dispatch(Creators.getSizesRequest());
    dispatch(Creators.getDemographiesRequest());
    dispatch(Creators.getWarehouseTypesRequest());
  }, [dispatch, id]);

  useEffect(() => {
    initializePage();
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [initializePage, dispatch]);

  return (
    <Content>
      <Header />
      <GeneralInfoForm
        isFormEditable={isFormEditable}
        setIsFormEditable={setIsFormEditable}
      />
      <PlanogramsTable
        isFormEditable={isFormEditable}
        currentPagination={currentPagination}
        setCurrentPagination={setCurrentPagination}
      />
    </Content>
  );
};
export default PlanogramWarehousesDetailPage;

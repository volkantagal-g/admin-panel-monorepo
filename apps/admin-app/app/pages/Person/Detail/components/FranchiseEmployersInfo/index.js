import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import { usePermission } from '@shared/hooks';
import AntCard from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';
import EmployersInfoForm from './editForm';
import { getFranchisesSelector } from '@shared/containers/Select/Franchise/redux/selectors';
import AddNewFranchiseEmployer from './addNewForm';

const FranchiseEmployersInfo = ({ data, isPending, handleAdd, handleEdit, handleRemove, editPermKey }) => {
  const { t } = useTranslation('personPage');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const hasPermission = canAccess(editPermKey);
  const franchises = useSelector(getFranchisesSelector.getData);
  const isFranchisesPending = useSelector(getFranchisesSelector.getIsPending);

  useEffect(() => {
    if (franchises && franchises.length) {
      const franchiseIds = franchises?.map(franchise => franchise._id);
      dispatch(Creators.getFranchisesAreasRequest({ franchiseIds }));
    }
  }, [dispatch, franchises]);

  return (
    <AntCard
      bordered={false}
      title={t('FRANCHISE_EMPLOYER.TITLE')}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('EDIT')} key="1">
          <EmployersInfoForm
            data={data}
            isPending={isPending || isFranchisesPending}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            hasPermission={hasPermission}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('FRANCHISE_EMPLOYER.ADD_NEW_EMPLOYER')} key="2" disabled={!hasPermission}>
          <AddNewFranchiseEmployer
            isPending={isPending || isFranchisesPending}
            handleAdd={handleAdd}
          />
        </Tabs.TabPane>
      </Tabs>
    </AntCard>
  );
};

export default FranchiseEmployersInfo;

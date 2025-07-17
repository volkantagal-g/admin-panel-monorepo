import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import { Col, Row, Typography } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import PickerList from './components/PickerList';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { pickerListSelector } from './redux/selectors';
import Filter from './components/Filter';

const reduxKey = REDUX_KEY.PICKER.LIST;

const { Title } = Typography;

const PickerListPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });
  usePageViewAnalytics({
    name: ROUTE.PICKER_LIST.name,
    squad: ROUTE.PICKER_LIST.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const pickerListData = useSelector(pickerListSelector.getData);
  const pickerListIsPending = useSelector(pickerListSelector.getIsPending);
  const filteredData = filters.pickerFilterText
    ? pickerListData?.filter(picker => {
      return (
        picker.name
          ?.toLowerCase()
          .indexOf(filters.pickerFilterText.toLowerCase()) > -1 ||
          picker._id
            ?.toLowerCase()
            .indexOf(filters.pickerFilterText.toLowerCase()) > -1 ||
          picker.personalGsm?.indexOf(filters.pickerFilterText.toLowerCase()) >
            -1 ||
            picker.uniqueIdentifier?.toLowerCase().indexOf(
              filters.pickerFilterText.toLowerCase(),
            ) > -1 ||
            picker.username?.toLowerCase().indexOf(filters.pickerFilterText.toLowerCase()) >
              -1 || (typeof picker.tc === 'string' && picker.tc?.toLowerCase().indexOf(filters.pickerFilterText.toLowerCase()) >
              -1)
      );
    })
    : pickerListData;

  useEffect(() => {
    dispatch(Creators.getPickerListRequest());
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.PICKER.LIST')} />

      <Row justify="space-between" align="middle">
        <Title level={3}>{t('global:PAGE_TITLE.PICKER.LIST')}</Title>
      </Row>
      <Filter
        filters={filters}
        handleSubmit={newFilters => {
          setFilters(newFilters);
          setPagination({ ...pagination, current: 1 });
        }}
        isPending={pickerListIsPending}
      />
      <Row>
        <Col span={24}>
          <PickerList
            pickers={filteredData}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Col>
      </Row>
    </>
  );
};

export default PickerListPage;
